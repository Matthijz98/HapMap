<script lang="ts">
  import AltIngredient from './AltIngredient.svelte';
  
  export let alt_ingredients: any[];
</script>

<div class="bg-slate-400 rounded shadow p-1">
  <table class="w-full">
    <thead>
      <tr class="font-medium">
        <td>Ingrediënt</td>
        <td>Voor allergie</td>
        <td>Hoeveelheid p.p.</td>
        <td>Hoeveelheid totaal</td>
      </tr>
    </thead>
    <tbody>
      {#each alt_ingredients as alt_ingredient, index}
        <AltIngredient alt_ingredient={alt_ingredient} />
      {/each}
    </tbody>
  </table>
</div>