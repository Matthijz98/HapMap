<script lang="ts">
  import { eatersStore } from '../stores/eatersStore.svelte';
  import type { AllergyOutSchema } from "$lib/client/types.gen";

  interface Props {
    allergy: AllergyOutSchema;
  }

  let { allergy }: Props = $props();

  function handleButtonClick(increment: number) {
    eatersStore.updateEatersWithAllergy(allergy.name, increment);
  }
  
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value, 10);
    if (!isNaN(newValue)) {
      eatersStore.setEatersWithAllergy(allergy.name, newValue);
    }
  }
</script>

<div class="flex">
  <label for="allergy-{allergy.sqid}" class="pr-2">{allergy.name}</label>
  <button
    onclick={() => handleButtonClick(-1)}
    class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-l font-medium"
  >
    -
  </button>
  <input
    id="allergy-{allergy.sqid}"
    type="number"
    value={eatersStore.getEatersWithAllergy(allergy.name)}
    oninput={handleInputChange}
    class="w-full px-1 py-0.5"
  />
  <button
    onclick={() => handleButtonClick(1)}
    class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-r font-medium"
  >
    +
  </button>
</div>