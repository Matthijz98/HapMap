<script lang="ts">
  import { eaters, allergies } from "../stores/eatersStore.ts";
  import type { AllergyType, RecipeIngredientType } from "../../content/config.ts";
  import Ingredients from "./Ingredients.svelte";
  import { onMount } from "svelte";
  
  export let title: string;
  export let description: string;
  export let date: string;
  export let tags: string[];
  export let ingredients: RecipeIngredientType[];
  
  $: $eaters;
  $: $allergies;
  
  $: recipe_allergies = ingredients
    .map((ingredient: RecipeIngredientType) => ingredient.ingredient.allergies)
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
    <h2 class="font-bold text-xl pt-4">Ingredienten</h2>
    <Ingredients {ingredients} />
  </div>

  <div>
    {#if recipe_allergies.length > 0}
      <h2 class="font-bold text-xl pt-4">Allergenen</h2>
      <ul>
        {#each recipe_allergies as allergy}
          <span>{allergy.name}, </span>
        {/each}
      </ul>
    {/if}

    <h2 class="font-bold text-xl pt-4">Eeters</h2>
    <span class="font-medium">Totaal: {$eaters}</span><br/>
    {#if Object.keys($allergies).length > 0}
      Waarvan met allergie:
      <ul>
        {#each Object.entries($allergies) as [key, value]}
          {#if recipe_allergies.some((allergy) => allergy.name === key)}
            <li>
              {key}: {value}
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