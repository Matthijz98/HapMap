<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { AlternativeOutSchema, AllergyOutSchema } from "$lib/client/types.gen";

  export let alt_ingredient: AlternativeOutSchema;
  export let allergies: AllergyOutSchema[] | undefined;

  $: eatersWithAllergies = eatersStore.getEatersWithAnyAllergy(allergies);
</script>

<li>
  <span class="font-medium pl-4">{alt_ingredient.quantity * eatersWithAllergies} {alt_ingredient.unit}</span> - {alt_ingredient.ingredient.name_plural}
</li>