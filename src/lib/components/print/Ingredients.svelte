<script lang="ts">
  import Ingredient from "./Ingredient.svelte";
  import type { RecipeIngredientOutSchema } from "$lib/client/types.gen";

  export let ingredients: RecipeIngredientOutSchema[];
</script>

<ul>
  {#each ingredients as ingredient}
    <Ingredient {ingredient} />
  {/each}
</ul>