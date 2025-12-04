<script lang="ts">
  import { updateAllergies, allergies } from '../stores/eatersStore';
  import type { AllergyType } from "../../content/config.ts";
  
  export let allergy: AllergyType;
  
  $: $allergies;
  
  // Get current value, defaulting to 0 if undefined
  $: currentValue = $allergies[allergy.name] ?? 0;
  
  function handleButtonClick(increment) {
    const newValue = currentValue + increment;
    // Prevent negative values
    if (newValue >= 0) {
      updateAllergies(allergy, newValue);
    }
  }
  
  function handleInputChange(event) {
    const newValue = parseInt(event.target.value, 10);
    // Only accept non-negative numbers
    if (!isNaN(newValue) && newValue >= 0) {
      updateAllergies(allergy, newValue);
    }
  }
</script>

<div class="flex">
  <label class="pr-2">{allergy.name}</label>
  <button on:click={() => handleButtonClick(-1)} class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-l font-medium">-</button>
  <input type="number" value={currentValue} min="0" on:input={handleInputChange} class="w-full px-1 py-0.5"/>
  <button on:click={() => handleButtonClick(1)} class="bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-r font-medium">+</button>
</div>