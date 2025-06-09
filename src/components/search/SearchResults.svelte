<script lang="ts">
  import { onMount } from 'svelte';
  
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
  
  export let results: Result[] = [];
  export let searchInput: string = '';
  
  let data: ResultData[] = [];
  
  $: if (results) {
    fetchData();
  }
  
  async function fetchData() {
    if (results && results.length > 0) {
      data = await Promise.all(results.map((result: Result) => result.data()));
    } else {
      data = [];
    }
  }
</script>

<div class="flex gap-2 flex-col pt-2">
  {#if data.length > 0}
    {#each data as result_data, index}
      <a href={result_data.url} class="bg-slate-300 p-2 rounded shadow">
        <h3 class="text-xl font-bold">{result_data.meta.title}</h3>
        <div class="flex flex-wrap gap-1 mt-1.5">
          <div class="px-1 py-0.5 text-sm">Ingredienten: </div>
          {#each result_data.filters.ingredient as filter, filterIndex}
            <span class="bg-slate-400 px-1 py-0.5 rounded text-white text-sm">{filter}</span>
          {/each}
        </div>
      </a>
    {/each}
  {:else if searchInput.length > 0}
    <div class="bg-slate-300 p-2 rounded shadow">Geen recepten gevonden</div>
  {/if}
</div>