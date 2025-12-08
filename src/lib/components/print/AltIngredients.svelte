<script lang="ts">
  import AltIngredient from './AltIngredient.svelte';
  import type { AlternativeOutSchema, AllergyOutSchema } from "$lib/client/types.gen";

  export let alt_ingredient: AlternativeOutSchema;
  export let allergies: AllergyOutSchema[] | undefined;
</script>

<ul>
  <AltIngredient {alt_ingredient} {allergies} />
</ul>