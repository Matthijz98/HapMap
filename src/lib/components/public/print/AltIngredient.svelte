<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { AlternativeOutSchema } from "$lib/api/public-client/types.gen";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
  }

  let { alt_ingredient }: Props = $props();

  const eatersWithAllergies = $derived(
    eatersStore.getEatersWithAnyAllergy(alt_ingredient.for_allergies)
  );
</script>

<li>
  <span class="font-medium pl-4">{alt_ingredient.quantity * eatersWithAllergies} {alt_ingredient.unit}</span> - {alt_ingredient.alternative_ingredient.name_plural}
</li>