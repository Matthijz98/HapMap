<script lang="ts">
  import { allergies } from "../stores/eatersStore.ts";
  import type { AltIngredientType } from "../../content/config.ts";
  
  export let alt_ingredient: AltIngredientType;
  
  $: $allergies;
  $: eatersWithAllergie = alt_ingredient.for_allergy ? $allergies[alt_ingredient.for_allergy.name] : 0;
</script>

<tr>
  <td>{alt_ingredient.ingredient.name}</td>
  <td>{alt_ingredient.for_allergy?.name}</td>
  <td>{alt_ingredient.amount} {alt_ingredient.unit.base_name}</td>
  <td>{alt_ingredient.amount * eatersWithAllergie} {alt_ingredient.unit.base_name}</td>
</tr>