<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { AlternativeOutSchema } from "$lib/api/public-client/types.gen";
  import UnitDisplay from "$lib/components/utils/UnitDisplay.svelte";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
  }

  let { alt_ingredient }: Props = $props();

  const eatersWithAllergies = $derived(
    eatersStore.getEatersWithAnyAllergy(alt_ingredient.for_allergies)
  );
</script>

<li>
  <span class="pl-4">
    <UnitDisplay
      quantity={alt_ingredient.quantity * eatersWithAllergies}
      unit={alt_ingredient.unit ?? null}
    />
  </span> - {alt_ingredient.alternative_ingredient.name_plural}
</li>