<script lang="ts">
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import IngredientForm from '$lib/components/admin/ingredients/IngredientForm.svelte';
	import {
		ingredientsApiPrivateCreateIngredientMutation,
		ingredientsApiPrivateGetAllergiesOptions,
		ingredientsApiPrivateGetIngredientsQueryKey
	} from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import type { AllergyOutSchema } from '$lib/api/public-client/types.gen';

	type IngredientFormPayload = {
		name_singular: string;
		name_plural: string;
		allergy_sqids: string[];
	};

	const queryClient = useQueryClient();

	const allergiesQuery = createQuery(() => ({
		...ingredientsApiPrivateGetAllergiesOptions({})
	}));

	let availableAllergies = $derived((allergiesQuery.data as AllergyOutSchema[]) || []);

	const createMutationObj = createMutation(() => ({
		...ingredientsApiPrivateCreateIngredientMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ingredientsApiPrivateGetIngredientsQueryKey({})
			});
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto('/admin/ingredienten');
		}
	}));

	function handleSave(payload: IngredientFormPayload) {
		createMutationObj.mutate({ body: payload as never });
	}

	function handleCancel() {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/admin/ingredienten');
	}
</script>

<div class="container mx-auto p-6">
	<div class="bg-white rounded-lg shadow-md p-6">
		<IngredientForm
				title="Nieuw ingredient toevoegen"
				submitLabel="Toevoegen"
				{availableAllergies}
				onSave={handleSave}
				onCancel={handleCancel}
		/>
	</div>
</div>
