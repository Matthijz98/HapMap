<script lang="ts">
	import type { AllergyOutSchema, IngredientOutSchema } from '$lib/api/public-client/types.gen';

	type IngredientFormPayload = {
		sqid?: string;
		name_singular: string;
		name_plural: string;
		allergy_sqids: string[];
	};

	interface Props {
		ingredient?: IngredientOutSchema;
		availableAllergies: AllergyOutSchema[];
		onSave: (payload: IngredientFormPayload) => void;
		onCancel?: () => void;
		submitLabel?: string;
		title?: string;
	}

	let {
		ingredient,
		availableAllergies,
		onSave,
		onCancel,
		submitLabel = 'Opslaan',
		title
	}: Props = $props();

	let nameSingular = $state('');
	let namePlural = $state('');
	let selectedAllergySqids = $state<string[]>([]);

	$effect(() => {
		if (ingredient) {
			nameSingular = ingredient.name_singular;
			namePlural = ingredient.name_plural;
			selectedAllergySqids = ingredient.allergies?.map((a) => a.sqid) || [];
		} else {
			nameSingular = '';
			namePlural = '';
			selectedAllergySqids = [];
		}
	});

	function toggleAllergy(sqid: string) {
		if (selectedAllergySqids.includes(sqid)) {
			selectedAllergySqids = selectedAllergySqids.filter((s) => s !== sqid);
		} else {
			selectedAllergySqids = [...selectedAllergySqids, sqid];
		}
	}

	function handleSubmit() {
		onSave({
			...(ingredient?.sqid ? { sqid: ingredient.sqid } : {}),
			name_singular: nameSingular,
			name_plural: namePlural,
			allergy_sqids: selectedAllergySqids
		});
	}
</script>

<div class="space-y-4">
	{#if title}
		<h3 class="text-xl font-bold">{title}</h3>
	{/if}

	<div>
		<label for="name_singular" class="block text-sm font-medium text-gray-700 mb-1">
			Enkelvoud *
		</label>
		<input
			id="name_singular"
			type="text"
			bind:value={nameSingular}
			required
			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			placeholder="bijv. ui"
		/>
	</div>

	<div>
		<label for="name_plural" class="block text-sm font-medium text-gray-700 mb-1">
			Meervoud *
		</label>
		<input
			id="name_plural"
			type="text"
			bind:value={namePlural}
			required
			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			placeholder="bijv. uien"
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700 mb-2">Allergieen</label>
		<div class="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-2">
			{#if availableAllergies.length === 0}
				<div class="text-sm text-gray-500">Geen allergieen gevonden.</div>
			{:else}
				{#each availableAllergies as allergy (allergy.sqid)}
					<label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
						<input
							type="checkbox"
							checked={selectedAllergySqids.includes(allergy.sqid)}
							onchange={() => toggleAllergy(allergy.sqid)}
							class="rounded"
						/>
						<span class="text-sm">{allergy.name}</span>
					</label>
				{/each}
			{/if}
		</div>
	</div>

	<div class="flex gap-3 justify-end pt-2">
		{#if onCancel}
			<button
				type="button"
				onclick={onCancel}
				class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
			>
				Annuleren
			</button>
		{/if}
		<button
			type="button"
			onclick={handleSubmit}
			disabled={!nameSingular || !namePlural}
			class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{submitLabel}
		</button>
	</div>
</div>
