<script lang="ts">
    import {page} from '$app/state';
    import {createQuery} from "@tanstack/svelte-query";

		import { recipesApiPublicGetRecipesOptions } from '$lib/api/public-client/@tanstack/svelte-query.gen';
		import RecipesList from '$lib/components/public/recipes/RecipesList.svelte';


    // get the sqid from the slug by splitting on the last -
    const username: string = page.params.slug ?? '';

    let recipesQuery = createQuery(() => ({
        ...recipesApiPublicGetRecipesOptions({query: {created_by: username }})
    }));
</script>

<RecipesList bind:recipesQuery={recipesQuery} />
