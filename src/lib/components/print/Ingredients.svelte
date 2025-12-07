<script lang="ts">
  import Ingredient from "./Ingredient.svelte";
  import type { RecipeIngredientType } from '../../content/config.ts';
  
  export let ingredients: RecipeIngredientType[];
</script>

<ul>
  {#each ingredients as ingredient}
    <Ingredient {ingredient} />
  {/each}
</ul>