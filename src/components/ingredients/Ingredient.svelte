<script lang="ts">
  import type { RecipeIngredientType } from '../../content/config.ts';
  import { allergies, eaters } from "../stores/eatersStore.ts";
  import AltIngredients from "./AltIngredients.svelte";

  export let ingredient: RecipeIngredientType;

  $: $eaters;
  $: $allergies;
  $: eatersWithAllergies = 0;

  $: {
    if (ingredient.ingredient.allergies) {
      // Get the amount of eaters with the allergy for the ingredient
      // Allergies are stored in the store as an object with the allergy name as key and a int as value
      eatersWithAllergies = 0;
      ingredient.ingredient.allergies.forEach((allergy) => {
        if($allergies[allergy.name]){
          eatersWithAllergies += $allergies[allergy.name];
        }
      });
    }
  }

  $: remainingEaters = $eaters - eatersWithAllergies;
</script>

<tr class="odd:bg-slate-300">
  <td class="px-2 py-1" data-pagefind-filter="ingredient">{ingredient.ingredient.name}</td>
  <td class="px-2 py-1">
    {#if ingredient.ingredient.allergies}
      {#each ingredient.ingredient.allergies as allergy}
        <span>{allergy.name}, </span>
      {/each}
    {/if}
  </td>
  <td class="px-2 py-1">{ingredient.amount ?? ''} {ingredient?.unit?.base_name ?? ''}</td>
  <td class="px-2 py-1">{ingredient.amount && (ingredient.amount * remainingEaters) } {ingredient.unit?.base_name ?? ''}</td>
</tr>
{#if ingredient.alt_ingredients?.length > 0 && ingredient.alt_ingredients?.some(alt_ingredient => $allergies[alt_ingredient.for_allergy.name])}
  <tr>
    <td colspan="4" class="px-2 py-1">
      <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>
    </td>
  </tr>
{/if}