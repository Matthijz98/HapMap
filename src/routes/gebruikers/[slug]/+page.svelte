<script lang="ts">
    import {page} from '$app/state';
    import {createQuery} from "@tanstack/svelte-query";
    import {
        recipesApiGetRecipesOptions
    } from "$lib/client/@tanstack/svelte-query.gen";
    import RecipesList from "$lib/components/recipes/RecipesList.svelte";


    // get the sqid from the slug by splitting on the last -
    const username: string = page.params.slug ?? '';

    let recipesQuery = createQuery(() => ({
        ...recipesApiGetRecipesOptions({query: {created_by: username }})
    }));
</script>

<RecipesList bind:recipesQuery={recipesQuery} />
