<script lang="ts">
  import { onMount } from 'svelte';
  const {results = $bindable()} = $props();
</script>

<div class="flex gap-2 flex-col pt-2">
  {#if results.length > 0}
    {#each results as result, index}
      <a href={`recepten/${result.name}-${result.sqid}`} class="bg-slate-300 p-2 rounded shadow">
        <h3 class="text-xl font-bold">{result.name}</h3>
        <div class="flex flex-wrap gap-1 mt-1.5">
          <div class="px-1 py-0.5 text-sm">Ingredienten: </div>
          <!--{#each result.filters.ingredient as filter, filterIndex}-->
          <!--  <span class="bg-slate-400 px-1 py-0.5 rounded text-white text-sm">{filter}</span>-->
          <!--{/each}-->
        </div>
        <div>Door: {result.created_by.title}</div>
      </a>
    {/each}
  {:else if results.length > 0}
    <div class="bg-slate-300 p-2 rounded shadow">Geen recepten gevonden</div>
  {/if}
</div>