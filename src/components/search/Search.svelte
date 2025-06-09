<script lang="ts">
  import { onMount } from 'svelte';
  import SearchResults from "./SearchResults.svelte";
  import SearchFilters from "./SearchFilters.svelte";
  import { activeFiltersStore } from "../stores/searchStores.ts";
  
  export let recipe_count: number;
  
  interface Result {
    data: () => Promise<ResultData>;
  }
  
  interface ResultData {
    url: string;
    meta: {
      title: string;
    };
    filters: {
      ingredient: string[];
    };
  }
  
  let pagefind = null;
  let filters = [];
  let query = '';
  let resultsOBJ: Result[] = [];
  let timeoutId: any = null;
  let searchInput: HTMLInputElement;
  
  $: $activeFiltersStore;
  
  async function search(text: string) {
    if (pagefind) {
      let results = await pagefind.debouncedSearch(text, {
        filters: $activeFiltersStore.filters
      });
      if (results) {
        resultsOBJ = results.results;
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
            results: results.results.length
          });
        } catch (e) {
        }
      }, 2000);
    }
  }
  
  function handleInputChange(e) {
    query = e.target.value;
    search(query);
  }
  
  onMount(async () => {
    // @ts-ignore
    const pagefindModule = await import("/pagefind/pagefind.js");
    pagefind = pagefindModule;
    pagefindModule.init();
    
    // Fetch the filters and set them in the state
    const fetchedFilters = await pagefindModule.filters();
    filters = fetchedFilters;
  });
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
  <SearchResults results={resultsOBJ} searchInput={query}/>
  <SearchFilters {filters}/>
</div>