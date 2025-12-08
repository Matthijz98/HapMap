<script lang="ts">
    import {page} from '$app/state';
    import {createQuery} from "@tanstack/svelte-query";
    import {recipesApiGetRecipeDetailOptions} from "$lib/client/@tanstack/svelte-query.gen";
    import Ingredients from "$lib/components/ingredients/Ingredients.svelte";
    import Eaters from "$lib/components/eaters/Eaters.svelte";

    // get the sqid from the slug by splitting on the last -
    const slug = page.params.slug ?? '';
    const recipe_sqid: string = slug.substring(slug.lastIndexOf('-') + 1);

    const recipeDetailQuery = createQuery(() => ({
        ...recipesApiGetRecipeDetailOptions({path: {sqid: recipe_sqid}})
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
    <div class="mb-4">
        <h2 class="text-2xl font-semibold mb-2">Ingredienten</h2>
        <Ingredients recipe_sqid={recipe_sqid}/>
    </div>
    <div>
        <h2 class="text-2xl font-semibold mb-2">Instructies</h2>
        <ol class="list-decimal list-inside">
            <!--{#each recipeDetailQuery.data.instructions as instruction}-->
            <!--    <li>{instruction}</li>-->
            <!--{/each}-->
        </ol>
    </div>
    {#if recipeDetailQuery.data}
        <Eaters allergies={recipeDetailQuery.data.includes_allergies}/>
    {/if}
</div>
