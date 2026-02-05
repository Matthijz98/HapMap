<script lang="ts">
  import { eatersStore } from "../stores/eatersStore.svelte";
  import type { RecipeIngredientOutSchema } from "$lib/client/types.gen";
  import Ingredients from "./Ingredients.svelte";
  import { onMount } from "svelte";
  
  export let title: string;
  export let description: string;
  export let date: string;
  export let tags: string[];
  export let ingredients: RecipeIngredientOutSchema[];

  $: recipe_allergies = ingredients
    .map((ingredient) => ingredient.ingredient.allergies)
    .flat()
    .filter(Boolean);
  
  onMount(() => {
    window.print();
  });
</script>

<h1 class="text-center font-bold text-3xl">
  {title}
</h1>

<div class="grid grid-cols-2">
  <div>
    <h2 class="font-bold text-xl pt-4">Ingrediënten</h2>
    <Ingredients {ingredients} />
  </div>

  <div>
    {#if recipe_allergies.length > 0}
      <h2 class="font-bold text-xl pt-4">Allergenen</h2>
      <ul>
        {#each recipe_allergies as allergy}
          {#if allergy}
            <span>{allergy.name}, </span>
          {/if}
        {/each}
      </ul>
    {/if}

    <h2 class="font-bold text-xl pt-4">Eters</h2>
    <span class="font-medium">Totaal: {eatersStore.totalEaters}</span><br/>
    {#if eatersStore.getActiveAllergies().length > 0}
      Waarvan met allergie:
      <ul>
        {#each eatersStore.getActiveAllergies() as allergyName}
          {#if recipe_allergies.some((allergy) => allergy?.name === allergyName)}
            <li>
              {allergyName}: {eatersStore.getEatersWithAllergy(allergyName)}
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
</div>

<h2 class="font-bold text-xl pt-4">Bereiding</h2>
<div class="prose max-w-full text-black prose-ul:text-black leading-5">
  <slot></slot>
</div>