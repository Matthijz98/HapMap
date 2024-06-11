import type {RecipeIngredientType} from '../../content/config.ts';
import {useStore} from "@nanostores/react";
import {allergies, eaters} from "../stores/eatersStore.ts";
import AltIngredients from "./AltIngredients.tsx";

export default function Ingredients({ingredient}: { ingredient: RecipeIngredientType }) {

    const $eaters = useStore(eaters);
    const $allergies = useStore(allergies);
    let eatersWithAllergies = 0;

    if (ingredient.ingredient.allergies) {
        // Get the ammount of eaters with the allergy for the ingredient
        // Allergies are stored in the store as an object with the allergy name as key and a int as value
        ingredient.ingredient.allergies.forEach((allergy) => {
            eatersWithAllergies += $allergies[allergy.name];
        });
    }

    const $remainingEaters = $eaters - eatersWithAllergies;

    return (
        <>
            <tr className={"odd:bg-slate-300"} >
                <td className={"px-2 py-1"} data-pagefind-filter="ingredient">{ingredient.ingredient.name}</td>
                <td className={"px-2 py-1"}>
                    {ingredient.ingredient.allergies && ingredient.ingredient.allergies.map((allergy) => (
                        <span key={allergy.name}>{allergy.name}, </span>
                    ))}
                </td>
                <td className={"px-2 py-1"}>{ingredient.amount} {ingredient.unit.base_name}</td>
                <td className={"px-2 py-1"}>{ingredient.amount * $remainingEaters} {ingredient.unit.base_name}</td>
            </tr>
            {ingredient.alt_ingredients &&
                <tr>
                    <td colSpan={4} className={"px-2 py-1"}>
                        <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>
                    </td>
                </tr>
            }

        </>
    );
}