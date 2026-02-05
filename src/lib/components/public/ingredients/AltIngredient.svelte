<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { AlternativeOutSchema } from "$lib/api/public-client/types.gen";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
  }

  let { alt_ingredient }: Props = $props();

  // Calculate the number of eaters with any of the allergies from the alternative ingredient
  const eatersWithAllergies = $derived(
    eatersStore.getEatersWithAnyAllergy(alt_ingredient.for_allergies)
  );

  // Calculate total quantity for alternative ingredient
  const totalQuantity = $derived(
    alt_ingredient.quantity * eatersWithAllergies
  );
</script>

<tr>
  <td>{alt_ingredient.alternative_ingredient.name_plural}</td>
  <td>
    {#if alt_ingredient.for_allergies && alt_ingredient.for_allergies.length > 0}
      {alt_ingredient.for_allergies.map(a => a.name).join(', ')}
    {/if}
  </td>
  <td>{alt_ingredient.quantity} {alt_ingredient.unit}</td>
  <td>{totalQuantity} {alt_ingredient.unit}</td>
</tr>