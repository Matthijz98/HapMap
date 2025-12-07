<script lang="ts">
  import { allergies, eaters } from "../stores/eatersStore.svelte.ts";
  import AltIngredients from "./AltIngredients.svelte";

  let {ingredient} = $props();
</script>

<tr class="odd:bg-slate-300">
  <td class="px-2 py-1">{ingredient.ingredient.name_plural}</td>
  <td class="px-2 py-1">
    {#if ingredient.ingredient.allergies}
      {#each ingredient.ingredient.allergies as allergy}
        <span>{allergy.name}, </span>
      {/each}
    {/if}
  </td>
  <td class="px-2 py-1">{ingredient.quantity ?? ''} {ingredient?.unit?.base_name ?? ''}</td>
  <td class="px-2 py-1">{ingredient.quantity && (ingredient.amount * eaters) } {ingredient.unit?.base_name ?? ''}</td>
</tr>
<!--{#if ingredient.alt_ingredients?.length > 0 && ingredient.alt_ingredients?.some(alt_ingredient => $allergies[alt_ingredient.for_allergy.name])}-->
<!--  <tr>-->
<!--    <td colspan="4" class="px-2 py-1">-->
<!--      <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>-->
<!--    </td>-->
<!--  </tr>-->
<!--{/if}-->