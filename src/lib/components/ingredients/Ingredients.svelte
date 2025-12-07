<script lang="ts">
  import Ingredient from "./Ingredient.svelte";
  import {createQuery} from "@tanstack/svelte-query";
  import {recipesApiGetRecipeDetailOptions} from "$lib/client/@tanstack/svelte-query.gen";
  let { recipe_sqid } = $props();

  const recipeDetailQuery = createQuery(() => ({
      ...recipesApiGetRecipeDetailOptions({ path: { sqid: recipe_sqid } })
  }));
</script>

<div class="bg-slate-200 rounded mb-4 overflow-x-auto">
  <table class="w-full text-nowrap whitespace-nowrap">
    <thead class="text-left">
      <tr class="border-b-2 border-slate-400">
        <th class="p-2">Ingredient</th>
        <th class="p-2">Allergieën</th>
        <th class="p-2">Hoeveelheid p.p.</th>
        <th class="p-2">Totaal</th>
      </tr>
    </thead>
    <tbody>
    {#if recipeDetailQuery.isLoading}
        <tr>
            <td class="p-2" colspan="4">Ingredienten aan het laden...</td>
        </tr>
    {:else if recipeDetailQuery.isError}
        <tr>
            <td class="p-2" colspan="4">Fout bij het laden van
                de ingredienten.</td>
        </tr>
    {:else if recipeDetailQuery.data}
      {#each recipeDetailQuery.data.ingredients as ingredient, index}
        <Ingredient {ingredient} />
      {/each}
    {/if}
    </tbody>
  </table>
</div>