<script lang="ts">
  import type { RecipeIngredientOutSchema } from "$lib/client/types.gen";
  import { eatersStore } from "../stores/eatersStore.svelte";
  import AltIngredients from "./AltIngredients.svelte";
  
  export let ingredient: RecipeIngredientOutSchema;

  $: eatersWithAllergies = eatersStore.getEatersWithAnyAllergy(ingredient.ingredient.allergies);
  $: remainingEaters = eatersStore.totalEaters - eatersWithAllergies;
</script>

<li>
  <span class="font-medium">{ingredient.quantity && (ingredient.quantity * remainingEaters)} {ingredient.unit ?? ''}</span> {ingredient.quantity && '-'} <span>{ingredient.ingredient.name_plural}</span>

  {#if ingredient.ingredient_alternative && eatersWithAllergies > 0}
    <AltIngredients
      alt_ingredient={ingredient.ingredient_alternative}
      allergies={ingredient.ingredient.allergies}
    />
  {/if}
</li>