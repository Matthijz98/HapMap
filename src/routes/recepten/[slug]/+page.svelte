<script lang="ts">
	import { page } from '$app/state';
	import { createQuery } from '@tanstack/svelte-query';
	import { recipesApiPublicGetRecipeDetailOptions } from '$lib/api/public-client/@tanstack/svelte-query.gen';
	import Ingredients from '$lib/components/public/ingredients/Ingredients.svelte';
	import Eaters from '$lib/components/public/eaters/Eaters.svelte';
	import RecipeStep from '$lib/components/public/recipes/RecipeStep.svelte';
	import RecipeNotes from '$lib/components/public/recipes/RecipeNotes.svelte';

	// get the sqid from the slug by splitting on the last -
	const slug = page.params.slug ?? '';
	const recipe_sqid: string = slug.substring(slug.lastIndexOf('-') + 1);

	const recipeDetailQuery = createQuery(() => ({
		...recipesApiPublicGetRecipeDetailOptions({ path: { sqid: recipe_sqid } })
	}));
</script>
<div class="max-w-3xl mx-auto p-4">
	<h1 class="text-3xl font-bold mb-4 text-white text-center">
		{#if recipeDetailQuery.isLoading}
			Recept aan het laden...
		{:else if recipeDetailQuery.isError}
			Fout bij het laden van het recept.
		{:else if recipeDetailQuery.data}
			{recipeDetailQuery.data.name}
		{/if}
	</h1>
	<div class="mb-4 flex justify-between">
		<h2 class="text-2xl font-semibold mb-2 text-white">Ingredienten</h2>
		<h4 class="text-white align-text-bottom">Door:
			{#if recipeDetailQuery.isLoading}
				Recept aan het laden...
			{:else if recipeDetailQuery.isError}
				Fout bij het laden van het recept.
			{:else if recipeDetailQuery.data}
				{recipeDetailQuery.data.created_by.title} <img src={recipeDetailQuery.data.created_by.profile_icon}
																											 alt="{recipeDetailQuery.data.created_by.title} profiel foto"
																											 class="w-6 h-6 rounded-full inline-block ml-2" />
			{/if}
		</h4>
	</div>
	<Ingredients recipe_sqid={recipe_sqid} />
	{#if recipeDetailQuery.data}
		<Eaters allergies={recipeDetailQuery.data.includes_allergies} />
	{/if}

	{#if recipeDetailQuery.data?.notes && recipeDetailQuery.data.notes.length > 0}
		<div class="mb-4">
			<RecipeNotes notes={recipeDetailQuery.data.notes} />
		</div>
	{/if}

	<div>
		<h2 class="text-2xl font-semibold mb-2 text-white">Instructies</h2>
		<div class="bg-slate-200 rounded mb-4 overflow-x-auto p-4">
			<!--	Loop over all recipeSteps -->
			{#if recipeDetailQuery.isLoading}
				Recept aan het laden...
			{:else if recipeDetailQuery.isError}
				Fout bij het laden van het recept.
			{:else if recipeDetailQuery.data?.steps}
				{#each recipeDetailQuery.data.steps as step, index (step.sqid)}
					<RecipeStep step={step} index={index} />
				{/each}
			{/if}

		</div>
	</div>
</div>
