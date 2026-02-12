<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { ingredientsApiPrivateGetIngredientsOptions } from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import type { IngredientOutSchema } from '$lib/api/public-client/types.gen';

	const ingredientsQuery = createQuery(() => ({
		...ingredientsApiPrivateGetIngredientsOptions({})
	}));

	let ingredients = $derived(ingredientsQuery.data || []);
	let isLoading = $derived(ingredientsQuery.isLoading);
	let error = $derived(ingredientsQuery.error);

	function allergyNames(ingredient: IngredientOutSchema) {
		return ingredient.allergies?.map((a) => a.name).join(', ') || '-';
	}
</script>

<div class="bg-white rounded-lg shadow">
	<div class="p-4 border-b flex items-center justify-between">
		<h2 class="text-xl font-bold">Ingredienten beheer</h2>
		<a
			href="/admin/ingredienten/toevoegen"
			class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			+ Nieuw ingredient
		</a>
	</div>

	{#if isLoading}
		<div class="p-8 text-center text-gray-500">Laden...</div>
	{:else if error}
		<div class="p-8 text-center text-red-500">
			Fout bij het laden van ingredienten: {error.message}
		</div>
	{:else if ingredients.length === 0}
		<div class="p-8 text-center text-gray-500">Geen ingredienten gevonden</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr class="text-left border-b">
						<th class="p-3 font-semibold text-sm text-gray-700">Enkelvoud</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Meervoud</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Allergieen</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Acties</th>
					</tr>
				</thead>
				<tbody>
					{#each ingredients as ingredient (ingredient.sqid)}
						<tr class="border-b hover:bg-gray-50">
							<td class="p-3">
								<div class="font-medium text-gray-900">{ingredient.name_singular}</div>
							</td>
							<td class="p-3">{ingredient.name_plural}</td>
							<td class="p-3 text-sm text-gray-600">
								{allergyNames(ingredient)}
							</td>
							<td class="p-3">
								<div class="flex gap-2">
									<a
										href="/admin/ingredienten/{ingredient.sqid}/bewerken"
										class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
									>
										Bewerken
									</a>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
