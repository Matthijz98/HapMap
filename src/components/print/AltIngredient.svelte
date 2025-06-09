<script lang="ts">
  import { allergies, eaters } from "../stores/eatersStore.ts";
  import type { AltIngredientType } from "../../content/config.ts";
  
  export let alt_ingredient: AltIngredientType;
  
  $: $eaters;
  $: $allergies;
  $: eatersWithAllergie = alt_ingredient.for_allergy ? $allergies[alt_ingredient.for_allergy.name] : 0;
</script>

<li>
  <span class="font-medium pl-4">{alt_ingredient.amount * eatersWithAllergie} {alt_ingredient.unit.base_name}</span> - {alt_ingredient.ingredient.name}
</li>