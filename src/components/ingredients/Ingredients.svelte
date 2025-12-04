<script lang="ts">
  import Ingredient from "./Ingredient.svelte";
  import type { RecipeIngredientType } from '../../content/config.ts';
  
  export let ingredients: RecipeIngredientType[];
</script>

<div class="bg-slate-200 rounded mb-4 overflow-x-auto">
  <table class="w-full text-nowrap whitespace-nowrap text-sm md:text-base">
    <thead class="text-left">
      <tr class="border-b-2 border-slate-400">
        <th class="p-2">Ingrediënt</th>
        <th class="p-2 hidden sm:table-cell">Allergieën</th>
        <th class="p-2">p.p.</th>
        <th class="p-2">Totaal</th>
      </tr>
    </thead>
    <tbody>
      {#each ingredients as ingredient, index}
        <Ingredient {ingredient} />
      {/each}
    </tbody>
  </table>
</div>