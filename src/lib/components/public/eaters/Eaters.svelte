<script lang="ts">
  import EaterInput from "./EaterInput.svelte";
  import { eatersStore } from '../stores/eatersStore.svelte';
  import type { AllergyOutSchema } from "$lib/client/types.gen";

  interface Props {
    allergies?: AllergyOutSchema[];
  }

  let { allergies = [] }: Props = $props();

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value, 10);
    if (!isNaN(newValue)) {
      eatersStore.totalEaters = newValue;
    }
  }
</script>

<div class="bg-slate-200 rounded p-2 mb-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <label for="total-eaters" class="text-nowrap">Aantal eters totaal:</label>
      <input
        id="total-eaters"
        class="w-full rounded px-1 py-0.5"
        type="number"
        value={eatersStore.totalEaters}
        oninput={handleInputChange}
      />
    </div>
    {#if allergies && allergies.length > 0}
      <div class="bg-slate-300 rounded p-2">
        <div class="mb-2">
          <h6 class="text-sm">Waarvan met een .... allergie:</h6>
        </div>

        <div class="flex flex-col gap-2">
          {#each allergies as allergy (allergy.sqid)}
            <EaterInput {allergy} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>