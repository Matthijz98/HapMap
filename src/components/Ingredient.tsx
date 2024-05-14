import {IngredientSchema} from '../content/config.ts';
import {useStore} from "@nanostores/react";
import {eaters} from "./stores/eatersStore.ts";

export default function Ingredients({ingredient}: any) {
    const $eaters = useStore(eaters);
    return (
        <tr>
            <td>{ingredient.ingredient.name}</td>
            <td>{ingredient.amount} {ingredient.unit.base_name}</td>
            <td>{ingredient.amount * $eaters} {ingredient.unit.base_name}</td>
        </tr>
    );
}