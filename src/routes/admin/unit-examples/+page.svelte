<script lang="ts">
	import {
		convertUnit,
		formatToOptimalUnit,
		formatQuantityWithUnit,
		addCustomConversion
	} from '$lib/utils/unitConversions';
	import UnitDisplay from '$lib/components/utils/UnitDisplay.svelte';

	// Example ingredients with various units
	const examples = [
		{ name: 'Flour', quantity: 1200, unit: 'g' },
		{ name: 'Water', quantity: 500, unit: 'ml' },
		{ name: 'Salt', quantity: 15, unit: 'g' },
		{ name: 'Olive Oil', quantity: 2500, unit: 'ml' },
		{ name: 'Sugar', quantity: 250, unit: 'g' },
		{ name: 'Milk', quantity: 750, unit: 'ml' }
	];

	// Add custom conversions
	addCustomConversion('blik', 'tray', 1 / 12);
	addCustomConversion('pak', 'stuk', 4);

	// Example conversions
	const conversionExamples = [
		{ from: 1000, fromUnit: 'g', toUnit: 'kg', result: convertUnit(1000, 'g', 'kg') },
		{ from: 1.5, fromUnit: 'l', toUnit: 'ml', result: convertUnit(1.5, 'l', 'ml') },
		{ from: 24, fromUnit: 'blik', toUnit: 'tray', result: convertUnit(24, 'blik', 'tray') },
		{ from: 3, fromUnit: 'pak', toUnit: 'stuk', result: convertUnit(3, 'pak', 'stuk') }
	];
</script>

<div class="container mx-auto p-6 max-w-4xl">
	<h1 class="text-3xl font-bold mb-6">Unit Conversion Examples</h1>

	<!-- Auto-optimized display -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Automatic Optimal Unit Display</h2>
		<p class="text-gray-600 mb-4">
			These quantities are automatically converted to the most appropriate unit:
		</p>
		<div class="space-y-2">
			{#each examples as item (item.name)}
				<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
					<span class="font-medium">{item.name}</span>
					<div class="flex gap-4">
						<span class="text-gray-500">Original: {item.quantity} {item.unit}</span>
						<span class="font-semibold">
							→ <UnitDisplay quantity={item.quantity} unit={item.unit} />
						</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Manual conversions -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Manual Unit Conversions</h2>
		<div class="space-y-2">
			{#each conversionExamples as conv, i (i)}
				<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
					<span>
						{conv.from}
						{conv.fromUnit} → {conv.toUnit}
					</span>
					<span class="font-semibold text-blue-600">
						{conv.result !== null ? `${conv.result} ${conv.toUnit}` : 'Not convertible'}
					</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- With conversion details -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Display with Conversion Details</h2>
		<p class="text-gray-600 mb-4">Shows the optimal unit plus available conversions:</p>
		<div class="space-y-2">
			{#each examples as item (item.name)}
				<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
					<span class="font-medium">{item.name}</span>
					<UnitDisplay quantity={item.quantity} unit={item.unit} showConversions={true} />
				</div>
			{/each}
		</div>
	</section>

	<!-- Recipe scaling example -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Recipe Scaling Example</h2>
		<p class="text-gray-600 mb-4">Scale a recipe from 4 to 8 people:</p>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<h3 class="font-semibold mb-2">Original (4 people)</h3>
				<div class="space-y-1">
					{#each examples.slice(0, 3) as item (item.name)}
						<div class="p-2 bg-gray-50 rounded text-sm">
							{item.name}: {formatQuantityWithUnit(item.quantity, item.unit)}
						</div>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="font-semibold mb-2">Scaled (8 people)</h3>
				<div class="space-y-1">
					{#each examples.slice(0, 3) as item (item.name)}
						{@const scaled = formatToOptimalUnit(item.quantity * 2, item.unit)}
						<div class="p-2 bg-green-50 rounded text-sm">
							{item.name}: {formatQuantityWithUnit(scaled.quantity, scaled.unit, false)}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- API usage -->
	<section class="bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Usage in Code</h2>
		<div class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
			<pre class="text-sm"><code>{`import {
  convertUnit,
  formatToOptimalUnit,
  formatQuantityWithUnit
} from '$lib/utils/unitConversions';

// Convert units
convertUnit(1000, 'g', 'kg')  // → 1

// Get optimal unit
formatToOptimalUnit(1200, 'g')  // → { quantity: 1.2, unit: 'kg' }

// Format for display
formatQuantityWithUnit(1500, 'ml', true)  // → "1.5 l"

// Add custom conversions
addCustomConversion('blik', 'tray', 1/12);  // 12 cans = 1 tray
convertUnit(24, 'blik', 'tray')  // → 2`}</code></pre>
		</div>
	</section>
</div>
