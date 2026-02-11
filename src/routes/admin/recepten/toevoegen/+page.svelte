<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import RecipeForm from '$lib/components/admin/recipies/RecipeForm.svelte';
	import { recipesApiPrivateCreatePrivateRecipeMutation } from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import { ingredientsApiGetIngredients, recipesApiPublicGetCategories } from '$lib/api/public-client/sdk.gen';
	import type {
		RecipeOutSchema,
		IngredientOutSchema,
		RecipeCategoryOutSchema
	} from '$lib/api/public-client/types.gen';

	let availableIngredients = $state<IngredientOutSchema[]>([]);
	let availableCategories = $state<RecipeCategoryOutSchema[]>([]);

	const queryClient = useQueryClient();

	// Load ingredients and categories on mount
	$effect(() => {
		loadIngredients();
		loadCategories();
	});

	async function loadIngredients() {
		try {
			const response = await ingredientsApiGetIngredients();
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

	const createMutationObj = createMutation(() => ({
		...recipesApiPrivateCreatePrivateRecipeMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
			goto('/admin/recepten');
		}
	}));

	function handleSave(recipe: Partial<RecipeOutSchema>) {
		createMutationObj.mutate({ body: recipe });
	}

	function handleCancel() {
		goto('/admin/recepten');
	}
</script>

<div class="container mx-auto p-6">
	<RecipeForm
		{availableIngredients}
		{availableCategories}
		onSave={handleSave}
		onCancel={handleCancel}
	/>
</div>
