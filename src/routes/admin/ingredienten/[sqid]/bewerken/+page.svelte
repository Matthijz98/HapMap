<script lang="ts">
    import {createMutation, createQuery, useQueryClient} from '@tanstack/svelte-query';
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';
    import IngredientForm from '$lib/components/admin/ingredients/IngredientForm.svelte';
    import {
        ingredientsApiPrivateGetIngredientDetailOptions,
        ingredientsApiPrivateUpdateIngredientMutation,
        ingredientsApiPrivateGetAllergiesOptions,
        ingredientsApiPrivateGetIngredientsQueryKey
    } from '$lib/api/private-client/@tanstack/svelte-query.gen';
    import type {AllergyOutSchema, IngredientOutSchema} from '$lib/api/public-client/types.gen';

    type IngredientFormPayload = {
        name_singular: string;
        name_plural: string;
        allergy_sqids: string[];
    };

    let sqid = $derived($page.params.sqid as string);

    const queryClient = useQueryClient();

    const ingredientDetailQuery = createQuery(() => ({
        ...ingredientsApiPrivateGetIngredientDetailOptions({path: {sqid}}),
        enabled: !!sqid
    }));

    const allergiesQuery = createQuery(() => ({
        ...ingredientsApiPrivateGetAllergiesOptions({})
    }));

    let currentIngredient = $derived(ingredientDetailQuery.data as IngredientOutSchema | undefined);
    let availableAllergies = $derived((allergiesQuery.data as AllergyOutSchema[]) || []);

    const updateMutationObj = createMutation(() => ({
        ...ingredientsApiPrivateUpdateIngredientMutation(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ingredientsApiPrivateGetIngredientsQueryKey({})
            });
            // eslint-disable-next-line svelte/no-navigation-without-resolve
            goto('/admin/ingredienten');
        }
    }));

    function handleSave(payload: IngredientFormPayload) {
        updateMutationObj.mutate({path: {sqid}, body: payload as never});
    }

    function handleCancel() {
        // eslint-disable-next-line svelte/no-navigation-without-resolve
        goto('/admin/ingredienten');
    }
</script>

<div class="container mx-auto p-6">
    {#if ingredientDetailQuery.isLoading}
        <div class="text-center p-8">Laden...</div>
    {:else if ingredientDetailQuery.error}
        <div class="text-center p-8 text-red-500">
            Fout bij het laden van ingredient: {ingredientDetailQuery.error.message}
        </div>
    {:else if currentIngredient}
        <div class="bg-white rounded-lg shadow-md p-6">
            <IngredientForm
                    title="Ingredient bewerken"
                    ingredient={currentIngredient}
                    {availableAllergies}
                    onSave={handleSave}
                    onCancel={handleCancel}
            />
        </div>
    {/if}
</div>
