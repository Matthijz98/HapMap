<script lang="ts">
  import { updateAllergies, allergies } from '../stores/eatersStore';
  import type { AllergyType } from "../../content/config.ts";
  
  export let allergy: AllergyType;
  
  $: $allergies;
  
  function handleButtonClick(increment) {
    updateAllergies(allergy, ($allergies[allergy.name] + increment));
  }
  
  function handleInputChange(event) {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      updateAllergies(allergy, newValue);
    }
  }
</script>

<div class="flex">
  <label class="pr-2">{allergy.name}</label>
  <button on:click={() => handleButtonClick(-1)} class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-l font-medium">-</button>
  <input type="number" value={$allergies[allergy.name]} on:input={handleInputChange} class="w-full px-1 py-0.5"/>
  <button on:click={() => handleButtonClick(1)} class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-r font-medium">+</button>
</div>