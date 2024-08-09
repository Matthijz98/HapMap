import { persistentAtom } from '@nanostores/persistent'
import type {AllergyType} from "../../content/config.ts";

export const eaters = persistentAtom('eaters', '10', {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const allergies = persistentAtom('allergies', {}, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function updateAllergies(allergy: AllergyType, newValue: number) {
    const oldData = allergies.get();
    // Create a new object with the updated values
    const newData = {
        ...oldData,
        [allergy.name]: newValue
    };
    allergies.set(newData); // Use the set method to update the state
}