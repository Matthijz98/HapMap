<script lang="ts">
    import {createQuery} from "@tanstack/svelte-query";
    import {recipesApiPublicGetRecipesOptions} from "$lib/api/public-client/@tanstack/svelte-query.gen";
    import RecipesList from "$lib/components/public/recipes/RecipesList.svelte";

    let recipesQuery = createQuery(() => ({
        ...recipesApiPublicGetRecipesOptions({})
    }));
</script>

<div class="container mx-auto p-4">
    <h1 class="text-center text-white text-7xl font-bold mb-4">HapMap</h1>
    <h2 class="text-center text-white text-2xl font-semibold mb-4">Alle recepten op een rij</h2>

    <RecipesList recipesQuery={recipesQuery} />
</div>