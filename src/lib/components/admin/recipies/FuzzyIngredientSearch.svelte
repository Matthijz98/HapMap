<script lang="ts">
	import Select from 'svelte-select';
	import type { IngredientOutSchema } from '$lib/api/public-client/types.gen';

	interface Props {
		ingredients: IngredientOutSchema[];
		selected: string;
		onSelect: (sqid: string) => void;
		placeholder?: string;
	}

	let { ingredients, selected, onSelect, placeholder = 'Zoek ingredient...' }: Props = $props();

	// Create items array for svelte-select
	let items = $derived(
		ingredients.map((ingredient) => ({
			label: ingredient.name_singular,
			value: ingredient.sqid
		}))
	);

	// Find the currently selected item
	let selectedItem = $derived(items.find((item) => item.value === selected) || null);

	// Handle selection changes
	function handleChange(event: CustomEvent<{ value: string; label: string } | null>) {
		if (event.detail?.value) {
			onSelect(event.detail.value);
		}
	}
</script>

<Select
	{items}
	value={selectedItem}
	on:change={handleChange}
	{placeholder}
	searchable={true}
	clearable={false}
	--border-radius="0.375rem"
	--border="1px solid rgb(209, 213, 219)"
	--border-focused="1px solid rgb(59, 130, 246)"
	--border-hover="1px solid rgb(156, 163, 175)"
	--item-hover-bg="rgb(243, 244, 246)"
	--item-is-active-bg="rgb(219, 234, 254)"
	--padding="0.5rem 0.75rem"
	--font-size="0.875rem"
	--height="38px"
/>
