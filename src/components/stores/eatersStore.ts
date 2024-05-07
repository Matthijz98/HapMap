import { persistentAtom } from '@nanostores/persistent'
import {getCollection} from "astro:content";


// Define a function to get all allergies from ingredients
async function getAllergies() {
    const ingredients = await getCollection('allergies');
    let allergies = ingredients.map((ingredient) => ingredient.data.name);

    // Remove duplicates
    allergies = [...new Set(allergies)];

    return allergies;
}

const allergies = await getAllergies();

// Initialize the map with all allergies and "geen" with a value of 0
const initialPersonsMap = allergies.reduce((map, allergy) => {
    map[allergy] = 0;
    return map;
}, {});

export const persons = persistentAtom<{ [key: string]: number }>('persons', initialPersonsMap, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

