<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { recipesApiPublicGetRecipesOptions } from '$lib/api/public-client/@tanstack/svelte-query.gen';
	import type { RecipeListOutSchema } from '$lib/api/public-client/types.gen';

	interface Props {
		onDelete: (sqid: string) => void;
	}

	let { onDelete }: Props = $props();

	const recipesQuery = createQuery(() => ({
		...recipesApiPublicGetRecipesOptions({})
	}));

	let recipes = $derived(recipesQuery.data || []);
	let isLoading = $derived(recipesQuery.isLoading);
	let error = $derived(recipesQuery.error);

	function handleDelete(recipe: RecipeListOutSchema) {
		if (confirm(`Weet je zeker dat je "${recipe.name}" wilt verwijderen?`)) {
			onDelete(recipe.sqid);
		}
	}
</script>

<div class="bg-white rounded-lg shadow">
	<div class="p-4 border-b flex items-center justify-between">
		<h2 class="text-xl font-bold">Recepten beheer</h2>
		<a
			href="/admin/recepten/toevoegen"
			class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			+ Nieuw recept
		</a>
	</div>

	{#if isLoading}
		<div class="p-8 text-center text-gray-500">Laden...</div>
	{:else if error}
		<div class="p-8 text-center text-red-500">
			Fout bij het laden van recepten: {error.message}
		</div>
	{:else if recipes.length === 0}
		<div class="p-8 text-center text-gray-500">Geen recepten gevonden</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr class="text-left border-b">
						<th class="p-3 font-semibold text-sm text-gray-700">Naam</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Categorie</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Korte beschrijving</th>
						<th class="p-3 font-semibold text-sm text-gray-700">Acties</th>
					</tr>
				</thead>
				<tbody>
					{#each recipes as recipe (recipe.sqid)}
						<tr class="border-b hover:bg-gray-50">
							<td class="p-3">
								<div class="font-medium text-gray-900">{recipe.name}</div>
							</td>
							<td class="p-3">
								<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
									{recipe.category.name}
								</span>
							</td>
							<td class="p-3 text-sm text-gray-600">
								{recipe.short_description || '-'}
							</td>
							<td class="p-3">
								<div class="flex gap-2">
									<a
										href="/admin/recepten/{recipe.sqid}/bewerken"
										class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
									>
										Bewerken
									</a>
									<button
										onclick={() => handleDelete(recipe)}
										class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
									>
										Verwijderen
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>