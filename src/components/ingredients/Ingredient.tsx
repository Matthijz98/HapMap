import type {RecipeIngredientType} from '../../content/config.ts';
import {useStore} from "@nanostores/react";
import {eaters} from "../stores/eatersStore.ts";
import AltIngredients from "./AltIngredients.tsx";

export default function Ingredients({ingredient}: { ingredient: RecipeIngredientType }) {
    const $eaters = useStore(eaters);

    return (
        <>
            <tr>
                <td>{ingredient.ingredient.name}</td>
                <td>
                    {ingredient.ingredient.allergies && ingredient.ingredient.allergies.map((allergy) => (
                        <span key={allergy.name}>{allergy.name}, </span>
                    ))}
                </td>
                <td>{ingredient.amount} {ingredient.unit.base_name}</td>
                <td>{ingredient.amount * $eaters} {ingredient.unit.base_name}</td>
            </tr>
            {ingredient.alt_ingredients &&
                <tr>
                    <td colSpan={4} className={'p-1'}>
                        <AltIngredients alt_ingredients={ingredient.alt_ingredients}/>
                    </td>
                </tr>
            }

        </>
    );
}