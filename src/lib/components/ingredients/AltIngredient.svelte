<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { AlternativeOutSchema, AllergyOutSchema } from "$lib/client/types.gen";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
    allergies?: AllergyOutSchema[];
  }

  let { alt_ingredient, allergies }: Props = $props();

  // Calculate the number of eaters with any of the relevant allergies
  const eatersWithAllergies = $derived(
    eatersStore.getEatersWithAnyAllergy(allergies)
  );

  // Calculate total quantity for alternative ingredient
  const totalQuantity = $derived(
    alt_ingredient.quantity * eatersWithAllergies
  );
</script>

<tr>
  <td>{alt_ingredient.ingredient.name_plural}</td>
  <td>
    {#if allergies && allergies.length > 0}
      {allergies.map(a => a.name).join(', ')}
    {/if}
  </td>
  <td>{alt_ingredient.quantity} {alt_ingredient.unit}</td>
  <td>{totalQuantity.toFixed(2)} {alt_ingredient.unit}</td>
</tr>