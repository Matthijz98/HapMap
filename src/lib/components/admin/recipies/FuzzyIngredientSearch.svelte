<script lang="ts">
	import Fuse from 'fuse.js';
	import type { IngredientOutSchema } from '$lib/api/public-client/types.gen';

	interface Props {
		ingredients: IngredientOutSchema[];
		selected: string;
		onSelect: (sqid: string) => void;
		placeholder?: string;
	}

	let { ingredients, selected, onSelect, placeholder = 'Zoek ingredient...' }: Props = $props();

	let searchQuery = $state('');
	let showDropdown = $state(false);
	let searchInput = $state<HTMLInputElement>();

	// Configure Fuse.js for fuzzy searching
	const fuse = $derived(
		new Fuse(ingredients, {
			keys: ['name_singular', 'name_plural'],
			threshold: 0.3,
			includeScore: true
		})
	);

	// Get filtered results
	const filteredIngredients = $derived(() => {
		if (!searchQuery) {
			return ingredients;
		}
		const results = fuse.search(searchQuery);
		return results.map((result) => result.item);
	});

	// Get selected ingredient name
	const selectedIngredient = $derived(
		ingredients.find((ing) => ing.sqid === selected)
	);

	function handleSelect(ingredient: IngredientOutSchema) {
		onSelect(ingredient.sqid);
		searchQuery = '';
		showDropdown = false;
	}

	function handleFocus() {
		showDropdown = true;
	}

	function handleBlur() {
		// Delay to allow click events on dropdown
		setTimeout(() => {
			showDropdown = false;
		}, 200);
	}

	function clearSelection() {
		onSelect('');
		setTimeout(() => {
			searchInput?.focus();
		}, 0);
	}
</script>

<div class="relative w-full">
	{#if selected && selectedIngredient}
		<!-- Show selected ingredient with clear button -->
		<div class="flex gap-1">
			<input
				type="text"
				value={selectedIngredient.name_singular}
				readonly
				class="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-sm cursor-default"
			/>
			<button
				type="button"
				onclick={clearSelection}
				class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600"
				title="Verwijder selectie"
			>
				×
			</button>
		</div>
	{:else}
		<!-- Search input -->
		<input
			bind:this={searchInput}
			type="text"
			value={searchQuery}
			oninput={(e) => searchQuery = e.currentTarget.value}
			onfocus={handleFocus}
			onblur={handleBlur}
			{placeholder}
			class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<!-- Dropdown results -->
		{#if showDropdown}
			<div
				class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
			>
				{#if filteredIngredients().length > 0}
					{#each filteredIngredients() as ingredient (ingredient.sqid)}
						<button
							type="button"
							onclick={() => handleSelect(ingredient)}
							class="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm border-b last:border-b-0"
						>
							<span class="font-medium block">{ingredient.name_singular}</span>
							{#if ingredient.name_plural !== ingredient.name_singular}
								<span class="text-xs text-gray-500 block">{ingredient.name_plural}</span>
							{/if}
						</button>
					{/each}
				{:else}
					<div class="px-3 py-2 text-sm text-gray-500">Geen ingrediënten gevonden</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>
