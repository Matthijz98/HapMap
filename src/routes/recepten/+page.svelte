<script lang="ts">
    import {createQuery} from "@tanstack/svelte-query";
    import {recipesApiGetRecipesOptions} from "$lib/client/@tanstack/svelte-query.gen";
    import RecipesList from "$lib/components/recipes/RecipesList.svelte";

    let recipesQuery = createQuery(() => ({
        ...recipesApiGetRecipesOptions({})
    }));
</script>

<div class="container mx-auto p-4">
    <h1 class="text-center text-white text-7xl font-bold mb-4">HapMap</h1>
    <h2 class="text-center text-white text-2xl font-semibold mb-4">Alle recepten op een rij</h2>

    <RecipesList recipesQuery={recipesQuery} />
</div>