import type {RecipeIngredientType} from '../../content/config.ts';
import {useStore} from "@nanostores/react";
import {allergies, eaters} from "../stores/eatersStore.ts";
import AltIngredients from "./AltIngredients.tsx";
// import AltIngredients from "./AltIngredients.tsx";


export default function Ingredients({ingredient}: { ingredient: RecipeIngredientType }) {

    const $eaters = useStore(eaters);
    const $allergies = useStore(allergies);
    let eatersWithAllergies = 0;

    if (ingredient.ingredient.allergies) {
        // Get the ammount of eaters with the allergy for the ingredient
        // Allergies are stored in the store as an object with the allergy name as key and a int as value
        ingredient.ingredient.allergies.forEach((allergy) => {
            if($allergies[allergy.name]){
                eatersWithAllergies += $allergies[allergy.name];
            }
        });
    }

    const $remainingEaters = $eaters - eatersWithAllergies;

    return (
        <li>
            <span
                className={'font-medium'}>{ingredient.amount && (ingredient.amount * $remainingEaters)} {ingredient.unit?.base_name ?? ''}</span> {ingredient.amount && '-'} <span>{ingredient.ingredient.name}</span>
            {/*<td className={"px-2 py-1"}>*/}
            {/*    {ingredient.ingredient.allergies && ingredient.ingredient.allergies.map((allergy) => (*/}
            {/*        <span key={allergy.name}>{allergy.name}, </span>*/}
            {/*    ))}*/}
            {/*</td>*/}

            {ingredient.alt_ingredients?.length > 0 && ingredient.alt_ingredients?.some(alt_ingredient => $allergies[alt_ingredient.for_allergy.name]) &&
                <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>
            }

        </li>
    );
}