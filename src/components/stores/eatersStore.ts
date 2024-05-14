import { persistentAtom } from '@nanostores/persistent'
import {getCollection} from "astro:content";

export const persons = persistentAtom<{ [key: string]: number }>('persons', {}, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function updatePersons(allergy: string, newValue: number) {
    persons.set(prevPersons => {
        console.log(prevPersons)
        const newPersons = {...prevPersons};
        console.log(newPersons)
        newPersons[allergy] = newValue;
        console.log(newPersons)
        return newPersons;
    });
}
