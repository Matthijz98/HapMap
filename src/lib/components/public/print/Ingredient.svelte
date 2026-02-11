<script lang="ts">
  import type { RecipeIngredientOutSchema } from "$lib/api/public-client/types.gen";
  import { eatersStore } from "../stores/eatersStore.svelte";
  import AltIngredients from "./AltIngredients.svelte";
  import UnitDisplay from "$lib/components/utils/UnitDisplay.svelte";

  export let ingredient: RecipeIngredientOutSchema;

  $: eatersWithAllergies = eatersStore.getEatersWithAnyAllergy(ingredient.ingredient.allergies);
  $: remainingEaters = eatersStore.totalEaters - eatersWithAllergies;
</script>

<li>
  {#if ingredient.quantity}
    <UnitDisplay
      quantity={ingredient.quantity * remainingEaters}
      unit={ingredient.unit}
    /> -
  {/if}
  <span>{ingredient.ingredient.name_plural}</span>

  {#if ingredient.ingredient_alternative && eatersWithAllergies > 0}
    <AltIngredients
      alt_ingredient={ingredient.ingredient_alternative}
    />
  {/if}
</li>