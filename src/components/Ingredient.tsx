import type {RecipeIngredientType} from '../content/config.ts';
import {useStore} from "@nanostores/react";
import {eaters} from "./stores/eatersStore.ts";

export default function Ingredients({ingredient}: {ingredient: RecipeIngredientType}) {
    const $eaters = useStore(eaters);

    return (
        <tr>
            <td>{ingredient.ingredient.name}</td>
            <td>
                {ingredient.ingredient.allergies.map((allergy) => (
                    <span key={allergy.name}>{allergy.name}, </span>
                ))}
            </td>
            <td>{ingredient.amount} {ingredient.unit.base_name}</td>
            <td>{ingredient.amount * $eaters} {ingredient.unit.base_name}</td>
        </tr>
    );
}