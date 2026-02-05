<script lang="ts">
	import { convertUnit, formatQuantityWithUnit } from '$lib/utils/unitConversions';

	interface Props {
		quantity: number;
		unit: string | null;
		showConversions?: boolean;
	}

	let { quantity, unit, showConversions = false }: Props = $props();

	// Get the optimal display format
	let displayText = $derived(formatQuantityWithUnit(quantity, unit, true));

	// Example conversions for demonstration
	let conversions = $derived(
		showConversions
			? [
					unit === 'g' && quantity >= 1000
						? { value: convertUnit(quantity, 'g', 'kg'), unit: 'kg' }
						: null,
					unit === 'ml' && quantity >= 1000
						? { value: convertUnit(quantity, 'ml', 'l'), unit: 'l' }
						: null,
					unit === 'kg'
						? { value: convertUnit(quantity, 'kg', 'g'), unit: 'g' }
						: null,
					unit === 'l' ? { value: convertUnit(quantity, 'l', 'ml'), unit: 'ml' } : null
			  ].filter(Boolean)
			: []
	);
</script>

<div class="inline-flex items-center gap-2">
	<span class="font-medium">{displayText}</span>
	{#if showConversions && conversions.length > 0}
		<span class="text-sm text-gray-500">
			({#each conversions as conv, i (i)}
				{#if conv && i > 0}, {/if}
				{#if conv}{conv.value?.toFixed(2)} {conv.unit}{/if}
			{/each})
		</span>
	{/if}
</div>
