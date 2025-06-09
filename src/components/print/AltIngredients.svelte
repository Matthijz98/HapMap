<script lang="ts">
  import AltIngredient from './AltIngredient.svelte';
  import type { AltIngredientType } from "../../content/config.ts";
  
  export let alt_ingredients: AltIngredientType[];
</script>

<ul>
  {#each alt_ingredients as alt_ingredient}
    <AltIngredient {alt_ingredient} />
  {/each}
</ul>