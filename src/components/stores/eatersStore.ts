import { persistentAtom } from '@nanostores/persistent'
import {getCollection} from "astro:content";

export const persons = persistentAtom<{ [key: string]: number }>('persons', {}, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function updatePersons(allergy: string, newValue: number) {
    console.log(`updatePersons called with allergy: ${allergy.name} and newValue: ${newValue}`);
    const oldData = persons.get();
    console.log(`oldData: ${JSON.stringify(oldData)}`);
    // check if a key with the value of the allergy name exists
    if (oldData[allergy.name ]) {
        // if it exists, update the value
        oldData[allergy.name] = newValue;
    } else {
        // if it does not exist, add a new key value pair
        oldData[allergy.name] = newValue;
    }
    persons.set(oldData);
    console.log(`newData: ${JSON.stringify(persons.get())}`);
}
