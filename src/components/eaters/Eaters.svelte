<script lang="ts">
  import EaterInput from "./EaterInput.svelte";
  import { eaters } from '../stores/eatersStore';
  import type { AllergyType } from "../../content/config.ts";
  
  export let allergies: AllergyType[];
  
  $: $eaters;
  
  function handleInputChange(event) {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      eaters.set(newValue);
    }
  }
</script>

<div class="bg-slate-200 rounded p-2 mb-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <label class="text-nowrap">Aantal eeters:</label>
      <input class="w-full rounded px-1 py-0.5" value={$eaters} on:input={handleInputChange}/>
    </div>
    
    {#each allergies as allergy}
      <EaterInput {allergy} />
    {/each}
  </div>
</div>