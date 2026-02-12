<script lang="ts">
    const {results = $bindable(), onSelect, selectedIndex = -1} = $props();
</script>

{#if results.length > 0}
    <div class="absolute left-0 right-0 top-full z-50 flex gap-2 flex-col pt-2">
        {#each results as result, index}
            <a
                href={`/recepten/${result.name}-${result.sqid}`}
                class={`p-2 rounded shadow ${index === selectedIndex ? "bg-slate-200 ring-2 ring-slate-500" : "bg-slate-300"}`}
                aria-selected={index === selectedIndex}
                on:click={onSelect}
            >
                <h3 class="text-xl font-bold">{result.name}</h3>
                <div class="flex flex-wrap gap-1 mt-1.5">
                    <div class="px-1 py-0.5 text-sm">Allergieen:</div>
                    {#each result.includes_allergies as allergy, filterIndex}
                        <span class="bg-slate-400 px-1 py-0.5 rounded text-white text-sm">{allergy.name}</span>
                    {/each}
                </div>
                <div class="text-sm">Door: {result.created_by.title}</div>
            </a>
        {/each}
    </div>
{:else if results.length > 0}
    <div class="bg-slate-300 p-2 rounded shadow">Geen recepten gevonden</div>
{/if}
