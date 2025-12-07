<script lang="ts">
    import SearchResults from "./SearchResults.svelte";
    import {type RecipeListOutSchema, recipesApiGetRecipes} from "$lib/client";

    let recipe_count: number = $props();

    let filters = [];
    let query = '';
    let timeoutId: any = null;
    let searchInput: HTMLInputElement;
    let results: Array<RecipeListOutSchema> | undefined = $state([])


    async function search(text: string) {
        try {
            const {data} = await recipesApiGetRecipes({ query: { name: text } });
            results = data;
        } catch (err) {
            console.error('search error', err);
        }

        // Clear the timeout if it's already set.
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set the timeout to execute the umami.trackEvent after 2 seconds.
        timeoutId = setTimeout(() => {
            try {
                // @ts-ignore
                umami.trackEvent('search', {
                    query: text,
                    results: results.length
                });
            } catch (e) {
            }
        }, 2000);
    }

    function handleInputChange(e) {
        query = e.target.value;
        search(query);
    }
</script>

<div>
    <input class="w-full bg-slate-300 rounded px-2 py-2 placeholder:font-medium placeholder:text-slate-500"
           bind:value={query}
           bind:this={searchInput}
           placeholder={`Zoek door alle ${recipe_count} recepten`}
           on:input={handleInputChange}
           autocapitalize="off"
           autocomplete="off"
           autocorrect="off"
           spellcheck="false">
    <SearchResults bind:results={results}/>
    <!--  <SearchFilters {filters}/>-->
</div>