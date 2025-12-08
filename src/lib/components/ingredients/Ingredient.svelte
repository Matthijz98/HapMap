<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import AltIngredients from "./AltIngredients.svelte";
  import type { RecipeIngredientOutSchema } from "$lib/client/types.gen";

  interface Props {
    ingredient: RecipeIngredientOutSchema;
  }

  let { ingredient }: Props = $props();

  // Check if any eaters have this allergy
  const hasEatersWithAllergies = $derived(
    eatersStore.getEatersWithAnyAllergy(ingredient.ingredient.allergies) > 0
  );

  // Calculate quantity for eaters without allergies
  const quantityForNonAllergic = $derived(
    ingredient.quantity
      ? eatersStore.calculateQuantityForNonAllergic(
          ingredient.quantity,
          ingredient.ingredient.allergies
        )
      : 0
  );

  // Calculate total quantity if no one has allergies
  const totalQuantity = $derived(
    ingredient.quantity
      ? eatersStore.calculateTotalQuantity(ingredient.quantity)
      : 0
  );
</script>

<tr class="odd:bg-slate-300">
  <td class="px-2 py-1">{ingredient.ingredient.name_plural}</td>
  <td class="px-2 py-1">
    {#if ingredient.ingredient.allergies && ingredient.ingredient.allergies.length > 0}
      {ingredient.ingredient.allergies.map(a => a.name).join(', ')}
    {/if}
  </td>
  <td class="px-2 py-1">{ingredient.quantity ?? ''} {ingredient?.unit ?? ''}</td>
  <td class="px-2 py-1">
    {#if hasEatersWithAllergies}
      {quantityForNonAllergic.toFixed(2)} {ingredient.unit ?? ''}
    {:else}
      {totalQuantity.toFixed(2)} {ingredient.unit ?? ''}
    {/if}
  </td>
</tr>
{#if ingredient.ingredient_alternative && hasEatersWithAllergies}
  <tr>
    <td colspan="4" class="px-2 py-1">
      <AltIngredients
        alt_ingredient={ingredient.ingredient_alternative}
        allergies={ingredient.ingredient.allergies}
      />
    </td>
  </tr>
{/if}
