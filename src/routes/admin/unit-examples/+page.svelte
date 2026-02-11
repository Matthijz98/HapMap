<script lang="ts">
	import {
		formatQuantityWithUnit,
		unitToDutch,
		getUnitOptions,
		unitConfigs,
		type BackendUnit
	} from '$lib/utils/units';
	import UnitDisplay from '$lib/components/utils/UnitDisplay.svelte';

	// Example ingredients with various units (using backend unit names)
	const examples = [
		{ name: 'Bloem', quantity: 1200, unit: 'gr' as BackendUnit },
		{ name: 'Water', quantity: 500, unit: 'ml' as BackendUnit },
		{ name: 'Zout', quantity: 15, unit: 'gr' as BackendUnit },
		{ name: 'Olijfolie', quantity: 2500, unit: 'ml' as BackendUnit },
		{ name: 'Suiker', quantity: 250, unit: 'gr' as BackendUnit },
		{ name: 'Melk', quantity: 750, unit: 'ml' as BackendUnit },
		{ name: 'Knoflook', quantity: 3, unit: 'cloves' as BackendUnit },
		{ name: 'Sla', quantity: 1, unit: 'head' as BackendUnit },
		{ name: 'Eieren', quantity: 4, unit: 'pieces' as BackendUnit }
	];

	// Get available units
	const unitOptions = getUnitOptions();
</script>

<div class="container mx-auto p-6 max-w-4xl">
	<h1 class="text-3xl font-bold mb-6">Unit Conversie Voorbeelden</h1>

	<!-- Unit Configuration Overview -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Beschikbare Eenheden</h2>
		<p class="text-gray-600 mb-4">
			Dit zijn alle eenheden die de backend accepteert met hun Nederlandse vertalingen:
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each unitOptions as option (option.value)}
				<div class="p-4 bg-gray-50 rounded border border-gray-200">
					<div class="flex justify-between items-start">
						<div>
							<span class="font-mono text-sm text-blue-600">{option.value}</span>
							<span class="mx-2">→</span>
							<span class="font-semibold">{option.label}</span>
						</div>
						{#if unitConfigs[option.value].convertibleTo}
							<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
								Auto-conversie
							</span>
						{/if}
					</div>
					{#if unitConfigs[option.value].convertibleTo}
						<div class="mt-2 text-sm text-gray-600">
							Converteert naar: {unitConfigs[option.value].convertibleTo?.dutchPlural}
							vanaf {unitConfigs[option.value].convertibleTo?.threshold}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Auto-optimized display -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Automatische Conversie</h2>
		<p class="text-gray-600 mb-4">
			Hoeveelheden worden automatisch geconverteerd naar de meest geschikte eenheid.
			Let op: alleen hele getallen (of bijna hele getallen) worden geconverteerd.
		</p>
		<div class="space-y-2">
			{#each examples as item (item.name)}
				<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
					<span class="font-medium">{item.name}</span>
					<div class="flex gap-4 items-center">
						<span class="text-gray-500 text-sm">
							Origineel: {item.quantity} {unitToDutch(item.unit, item.quantity)}
						</span>
						<span class="font-semibold text-blue-600">
							→ <UnitDisplay quantity={item.quantity} unit={item.unit} />
						</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Recipe scaling example -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Recept Schalen Voorbeeld</h2>
		<p class="text-gray-600 mb-4">Schaal een recept van 4 naar 8 personen:</p>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<h3 class="font-semibold mb-2 text-lg">Origineel (4 personen)</h3>
				<div class="space-y-1">
					{#each examples.slice(0, 6) as item (item.name)}
						<div class="p-2 bg-gray-50 rounded text-sm flex justify-between">
							<span>{item.name}:</span>
							<UnitDisplay quantity={item.quantity} unit={item.unit} />
						</div>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="font-semibold mb-2 text-lg">Geschaald (8 personen)</h3>
				<div class="space-y-1">
					{#each examples.slice(0, 6) as item (item.name)}
						<div class="p-2 bg-blue-50 rounded text-sm flex justify-between">
							<span>{item.name}:</span>
							<UnitDisplay quantity={item.quantity * 2} unit={item.unit} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Edge cases -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Speciale Gevallen</h2>
		<p class="text-gray-600 mb-4">
			Deze hoeveelheden worden NIET geconverteerd omdat ze geen hele getallen opleveren:
		</p>
		<div class="space-y-2">
			<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
				<span class="font-medium">5005 gram</span>
				<span class="font-semibold">
					<UnitDisplay quantity={5005} unit="gr" />
					<span class="text-sm text-gray-500 ml-2">(geen conversie naar 5.005 kilo)</span>
				</span>
			</div>
			<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
				<span class="font-medium">1250 milliliter</span>
				<span class="font-semibold">
					<UnitDisplay quantity={1250} unit="ml" />
					<span class="text-sm text-gray-500 ml-2">(geen conversie naar 1.25 liter)</span>
				</span>
			</div>
			<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
				<span class="font-medium">5000 gram</span>
				<span class="font-semibold">
					<UnitDisplay quantity={5000} unit="gr" />
					<span class="text-sm text-gray-500 ml-2">(wordt wel geconverteerd naar 5 kilo)</span>
				</span>
			</div>
		</div>
	</section>

	<!-- Usage guide -->
	<section class="mb-8 bg-white rounded-lg shadow p-6">
		<h2 class="text-2xl font-semibold mb-4">Gebruik in Code</h2>
		<div class="space-y-4">
			<div>
				<h3 class="font-semibold mb-2">Component Gebruik:</h3>
				<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm"><code>{`<UnitDisplay quantity={500} unit="gr" />`}</code></pre>
			</div>
			<div>
				<h3 class="font-semibold mb-2">Functie Gebruik:</h3>
				<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm"><code>{`import { formatQuantityWithUnit, unitToDutch } from '$lib/utils/units';

// Format met auto-conversie
formatQuantityWithUnit(1000, 'gr', true); // "1 kilo"

// Format zonder conversie
formatQuantityWithUnit(1000, 'gr', false); // "1000 gram"

// Alleen eenheid naam
unitToDutch('gr', 5); // "gram"
unitToDutch('pieces', 1); // "stuk"
unitToDutch('pieces', 2); // "stuks"`}</code></pre>
			</div>
		</div>
	</section>
</div>
