<script lang="ts">
  import AltIngredient from './AltIngredient.svelte';
  import type { AlternativeOutSchema } from "$lib/api/public-client/types.gen";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
  }

  let { alt_ingredient }: Props = $props();
</script>

<div class="bg-slate-400 rounded shadow p-1">
  <table class="w-full">
    <thead>
      <tr class="font-medium">
        <td>Alternatief ingredient</td>
        <td>Voor allergie</td>
        <td>Hoeveelheid p.p.</td>
        <td>Hoeveelheid totaal</td>
      </tr>
    </thead>
    <tbody>
      <AltIngredient {alt_ingredient} />
    </tbody>
  </table>
</div>