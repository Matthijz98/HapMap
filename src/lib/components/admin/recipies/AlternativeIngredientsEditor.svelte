<script lang="ts">
	import type {
		AlternativeOutSchema,
		IngredientOutSchema,
		AllergyOutSchema
	} from '$lib/api/public-client/types.gen';
	import FuzzyIngredientSearch from './FuzzyIngredientSearch.svelte';
	import UnitSelect from './UnitSelect.svelte';

	interface Props {
		alternatives: Array<AlternativeOutSchema & { tempId?: string }>;
		availableIngredients: IngredientOutSchema[];
		availableAllergies: AllergyOutSchema[];
		onUpdate: (alternatives: Array<AlternativeOutSchema & { tempId?: string }>) => void;
	}

	let { alternatives, availableIngredients, availableAllergies, onUpdate }: Props = $props();

	function addAlternative() {
		const newAlt: AlternativeOutSchema & { tempId?: string } = {
			sqid: `temp-${Date.now()}`,
			tempId: `temp-${Date.now()}`,
			quantity: 0,
			unit: 'gr',
			alternative_ingredient: {
				sqid: '',
				name_singular: '',
				name_plural: ''
			},
			for_allergies: []
		};
		onUpdate([...alternatives, newAlt]);
	}

	function removeAlternative(index: number) {
		const updated = alternatives.filter((_, i) => i !== index);
		onUpdate(updated);
	}

	function updateAlternative(index: number, field: string, value: unknown) {
		const updated = [...alternatives];
		if (field === 'alternative_ingredient') {
			const selected = availableIngredients.find((ing) => ing.sqid === value);
			if (selected) {
				updated[index].alternative_ingredient = selected;
			}
		} else if (field === 'for_allergies') {
			updated[index].for_allergies = value as AllergyOutSchema[];
		} else if (field === 'quantity') {
			updated[index].quantity = value as number;
		} else if (field === 'unit') {
			updated[index].unit = value as string;
		}
		onUpdate(updated);
	}

	function toggleAllergy(index: number, allergySqid: string) {
		const current = alternatives[index].for_allergies || [];
		const allergy = availableAllergies.find((a) => a.sqid === allergySqid);
		if (!allergy) return;

		const isSelected = current.some((a) => a.sqid === allergySqid);
		const updated = isSelected
			? current.filter((a) => a.sqid !== allergySqid)
			: [...current, allergy];

		updateAlternative(index, 'for_allergies', updated);
	}
</script>

<div class="space-y-3">
	{#if alternatives.length > 0}
		{#each alternatives as alt, index (alt.tempId || alt.sqid)}
			<div class="p-3 bg-blue-50 rounded border border-blue-200">
				<div class="grid grid-cols-12 gap-2 items-start">
					<!-- Alternative Ingredient Selection -->
					<div class="col-span-4">
						<label for="alt-ing-{index}" class="block text-xs font-medium text-gray-700 mb-1">
							Alternatief Ingredient
						</label>
						<FuzzyIngredientSearch
							ingredients={availableIngredients}
							selected={alt.alternative_ingredient.sqid}
							onSelect={(sqid) => updateAlternative(index, 'alternative_ingredient', sqid)}
							placeholder="Zoek ingredient..."
						/>
					</div>

					<!-- Quantity -->
					<div class="col-span-2">
						<label for="alt-qty-{index}" class="block text-xs font-medium text-gray-700 mb-1"
							>Aantal</label
						>
						<input
							id="alt-qty-{index}"
							type="number"
							bind:value={alt.quantity}
							oninput={(e) => {
								const target = e.target;
								if (target instanceof HTMLInputElement) {
									updateAlternative(index, 'quantity', parseFloat(target.value) || 0);
								}
							}}
							step="0.001"
							class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
						/>
					</div>

					<!-- Unit -->
					<div class="col-span-2">
						<label for="alt-unit-{index}" class="block text-xs font-medium text-gray-700 mb-1"
							>Eenheid</label
						>
						<UnitSelect
							selected={alt.unit ?? null}
							onSelect={(unit) => updateAlternative(index, 'unit', unit)}
						/>
					</div>

					<!-- For Allergies -->
					<div class="col-span-3">
						<span class="block text-xs font-medium text-gray-700 mb-1">Voor Allergieën</span>
						<div class="relative">
							<details class="group">
								<summary
									class="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white cursor-pointer list-none"
								>
									<span class="text-xs">
										{#if alt.for_allergies && alt.for_allergies.length > 0}
											{alt.for_allergies.length} geselecteerd
										{:else}
											Selecteer...
										{/if}
									</span>
								</summary>
								<div
									class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto"
								>
									{#each availableAllergies as allergy (allergy.sqid)}
										<label
											class="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 cursor-pointer"
										>
											<input
												type="checkbox"
												checked={alt.for_allergies?.some((a) => a.sqid === allergy.sqid)}
												onchange={() => toggleAllergy(index, allergy.sqid)}
												class="rounded"
											/>
											<span class="text-xs">{allergy.name}</span>
										</label>
									{/each}
								</div>
							</details>
						</div>
					</div>

					<!-- Remove Button -->
					<div class="col-span-1 flex items-end justify-end">
						<button
							type="button"
							onclick={() => removeAlternative(index)}
							class="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
							title="Verwijderen"
						>
							×
						</button>
					</div>
				</div>

				<!-- Display selected allergies -->
				{#if alt.for_allergies && alt.for_allergies.length > 0}
					<div class="mt-2 flex flex-wrap gap-1">
						{#each alt.for_allergies as allergy (allergy.sqid)}
							<span class="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs">
								{allergy.name}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	{/if}

	<button
		type="button"
		onclick={addAlternative}
		class="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
	>
		+ Alternatief Toevoegen
	</button>
</div>
