<script lang="ts">
  import { filtersVisibilityStore, activeFiltersStore } from '../stores/searchStores';
  
  export let filters: any;
  
  $: $filtersVisibilityStore;
  $: $activeFiltersStore;
  
  function toggleVisibility() {
    filtersVisibilityStore.set(!$filtersVisibilityStore);
  }
  
  function toggleFilter(category) {
    const isActive = $activeFiltersStore.filters && $activeFiltersStore.filters.category === category;
    
    if (isActive) {
      // If the filter is active, remove it
      activeFiltersStore.set({});
    } else {
      // If the filter is not active, add it
      activeFiltersStore.set({ filters: { category } });
    }
  }
  
  $: categories = Object.entries(filters);
</script>

<div class="text-slate-300 bg-slate-700 rounded mt-1 p-2">
  <div class={$filtersVisibilityStore ? '' : 'hidden'}>
    <h3>Filters:</h3>
    <div class="flex gap-2 flex-wrap">
      <h4>Categorie:</h4>
      
      {#if filters.category}
        {#each Object.entries(filters.category) as [key, value]}
          <button
            class={`rounded-full text-black px-2 py-1 text-xs text-nowrap ${$activeFiltersStore.filters && $activeFiltersStore.filters.category === key ? 'bg-green-500' : 'bg-white'}`}
            on:click={() => toggleFilter(key)}
          >
            {key} - {value}
          </button>
        {/each}
      {/if}
    </div>
  </div>
  
  <button class="w-full text-center" on:click={toggleVisibility}>
    {$filtersVisibilityStore ? 'Verberg filters' : 'Toon filters'}
  </button>
</div>