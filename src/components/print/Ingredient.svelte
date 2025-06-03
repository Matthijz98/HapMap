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

<li>
  <span class="font-medium">{ingredient.amount && (ingredient.amount * remainingEaters)} {ingredient.unit?.base_name ?? ''}</span> {ingredient.amount && '-'} <span>{ingredient.ingredient.name}</span>
  
  {#if ingredient.alt_ingredients?.length > 0 && ingredient.alt_ingredients?.some(alt_ingredient => $allergies[alt_ingredient.for_allergy.name])}
    <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>
  {/if}
</li>