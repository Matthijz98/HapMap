<script lang="ts">
	import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import RecipeForm from '$lib/components/admin/recipies/RecipeForm.svelte';
	import {
		recipesApiPrivateGetPrivateRecipeDetailOptions,
		recipesApiPrivateUpdatePrivateRecipeMutation
	} from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import { ingredientsApiPublicGetIngredients, recipesApiPublicGetCategories } from '$lib/api/public-client/sdk.gen';
	import type {
		RecipeOutSchema,
		IngredientOutSchema,
		RecipeCategoryOutSchema
	} from '$lib/api/public-client/types.gen';

	let sqid = $derived($page.params.sqid as string);

	let availableIngredients = $state<IngredientOutSchema[]>([]);
	let availableCategories = $state<RecipeCategoryOutSchema[]>([]);

	const queryClient = useQueryClient();

	// Query for editing recipe - using private API for detailed info
	const recipeDetailQuery = createQuery(() => ({
		...recipesApiPrivateGetPrivateRecipeDetailOptions({ path: { sqid } }),
		enabled: !!sqid
	}));

	// Load ingredients and categories on mount
	$effect(() => {
		loadIngredients();
		loadCategories();
	});

	async function loadIngredients() {
		try {
			const response = await ingredientsApiPublicGetIngredients();
			if (response.data && Array.isArray(response.data)) {
				availableIngredients = response.data as IngredientOutSchema[];
			}
		} catch (error) {
			console.error('Failed to load ingredients:', error);
		}
	}

	async function loadCategories() {
		try {
			const response = await recipesApiPublicGetCategories();
			if (response.data && Array.isArray(response.data)) {
				availableCategories = response.data as RecipeCategoryOutSchema[];
			}
		} catch (error) {
			console.error('Failed to load categories:', error);
		}
	}

	const updateMutationObj = createMutation(() => ({
		...recipesApiPrivateUpdatePrivateRecipeMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto('/admin/recepten');
		}
	}));

	function handleSave(recipe: Partial<RecipeOutSchema>) {
		updateMutationObj.mutate({ path: { sqid }, body: recipe });
	}

	function handleCancel() {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/admin/recepten');
	}

	let currentRecipe = $derived(recipeDetailQuery.data);
</script>

<div class="container mx-auto p-6">
	{#if recipeDetailQuery.isLoading}
		<div class="text-center p-8">Laden...</div>
	{:else if recipeDetailQuery.error}
		<div class="text-center p-8 text-red-500">
			Fout bij het laden van recept: {recipeDetailQuery.error.message}
		</div>
	{:else if currentRecipe}
		<RecipeForm
			recipe={currentRecipe}
			{availableIngredients}
			{availableCategories}
			onSave={handleSave}
			onCancel={handleCancel}
		/>
	{/if}
</div>
