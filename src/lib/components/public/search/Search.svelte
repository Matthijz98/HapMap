<script lang="ts">
    import SearchResults from "./SearchResults.svelte";
    import {type RecipeListOutSchema, recipesApiPublicGetRecipes} from "$lib/api/public-client";
    import {goto} from "$app/navigation";

    let { recipe_count = 0 }: { recipe_count?: number } = $props();

    let filters = [];
    let query = '';
    let timeoutId: any = null;
    let searchInput: HTMLInputElement;
    let results: Array<RecipeListOutSchema> | undefined = $state([])
    let selectedIndex = $state(-1);

    $effect(() => {
        if (results && results.length > 0) {
            if (selectedIndex === -1) {
                selectedIndex = 0;
            } else if (selectedIndex >= results.length) {
                selectedIndex = results.length - 1;
            }
        } else if (selectedIndex !== -1) {
            selectedIndex = -1;
        }
    });

    function getRecipeHref(result: RecipeListOutSchema) {
        return `/recepten/${result.name}-${result.sqid}`;
    }

    async function search(text: string) {
        if (text.length < 2) {
            results = [];
            selectedIndex = -1;
            return;
        }

        try {
            const {data} = await recipesApiPublicGetRecipes({ query: { name: text } });
            results = data || [];
            selectedIndex = (data && data.length > 0) ? 0 : -1;
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
                    results: results?.length ?? 0
                });
            } catch (e) {
            }
        }, 2000);
    }

    function handleInputChange(e: Event) {
        query = (e.target as HTMLInputElement).value;
        search(query);
    }

    function handleResultSelect() {
        query = '';
        results = [];
        selectedIndex = -1;
    }

    function handleKeydown(event: KeyboardEvent) {
        console.log('Key pressed:', event.key, 'Results:', results?.length, 'SelectedIndex:', selectedIndex);

        // Handle Escape even without results
        if (event.key === 'Escape') {
            event.preventDefault();
            handleResultSelect();
            return;
        }

        // For other keys, check if we have results
        if (!results || results.length === 0) {
            console.log('No results, ignoring keydown');
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectedIndex = (selectedIndex + 1) % results.length;
            console.log('ArrowDown: new selectedIndex =', selectedIndex);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectedIndex = (selectedIndex - 1 + results.length) % results.length;
            console.log('ArrowUp: new selectedIndex =', selectedIndex);
            return;
        }

        if (event.key === 'Enter' && selectedIndex >= 0) {
            event.preventDefault();
            const selected = results[selectedIndex];
            console.log('Enter pressed, selected:', selected);
            if (selected) {
                const href = getRecipeHref(selected);
                handleResultSelect();
                console.log(href);
                goto(href);
            }
            return;
        }
    }
</script>

<div class="relative w-full min-w-0">
    <input class="block w-full max-w-full min-w-0 bg-slate-300 rounded placeholder:font-medium placeholder:text-slate-500"
           bind:value={query}
           bind:this={searchInput}
           placeholder={`Zoek door alle recepten`}
           on:input={handleInputChange}
           on:keydown={handleKeydown}
           autocapitalize="off"
           autocomplete="off"
           autocorrect="off"
           spellcheck="false">
    <SearchResults bind:results={results} onSelect={handleResultSelect} {selectedIndex}/>
    <!--  <SearchFilters {filters}/-->
</div>