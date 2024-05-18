import type {RecipeIngredientType} from '../../content/config.ts';
import {useStore} from "@nanostores/react";
import {eaters} from "../stores/eatersStore.ts";
import AltIngredients from "./AltIngredients.tsx";

export default function Ingredients({ingredient}: { ingredient: RecipeIngredientType }) {
    const $eaters = useStore(eaters);

    return (
        <>
            <tr className={"odd:bg-slate-300"}>
                <td className={"px-2 py-1"}>{ingredient.ingredient.name}</td>
                <td className={"px-2 py-1"}>
                    {ingredient.ingredient.allergies && ingredient.ingredient.allergies.map((allergy) => (
                        <span key={allergy.name}>{allergy.name}, </span>
                    ))}
                </td>
                <td className={"px-2 py-1"}>{ingredient.amount} {ingredient.unit.base_name}</td>
                <td className={"px-2 py-1"}>{ingredient.amount * $eaters} {ingredient.unit.base_name}</td>
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