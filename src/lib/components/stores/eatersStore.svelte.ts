import "@macfja/svelte-persistent-runes"
import type {AllergyType} from "../../content/config.ts";


class EatersStore{
    eaters: number = $persist(10,'eaters');
    eaters_with_allergies: number = $persist(2,'eaters_with_allergies');

    function get_eaters_for_allergies(allergies: []): number {
        return 0
    }
}


export function updateAllergies(allergy: AllergyType, newValue: number) {
    // Create a new object with the updated values
    const newData = {
        ...allergies.value,
        [allergy.name]: newValue
    };
    allergies.value = newData; // Update the value
}
