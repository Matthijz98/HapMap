<script lang="ts">
  import AltIngredient from './AltIngredient.svelte';
  import type { AlternativeOutSchema } from "$lib/api/public-client/types.gen";

  interface Props {
    alt_ingredient: AlternativeOutSchema;
  }

  let { alt_ingredient }: Props = $props();
</script>

<ul>
  <AltIngredient {alt_ingredient} />
</ul>