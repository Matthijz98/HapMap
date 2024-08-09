import {useStore} from "@nanostores/react";
import {allergies} from "../stores/eatersStore.ts";
import type {AltIngredientType} from "../../content/config.ts";

export default function AltIngredient({alt_ingredient}: any) {
    const $allergies = useStore(allergies);

    const $eatersWithAllergie = alt_ingredient.for_allergy ? $allergies[alt_ingredient.for_allergy.name] : 0;

    return (
        <tr>
            <td>{alt_ingredient.ingredient.name}</td>
            <td>{alt_ingredient.for_allergy?.name}</td>
            <td>{alt_ingredient.amount} {alt_ingredient.unit.base_name}</td>
            <td>{alt_ingredient.amount * $eatersWithAllergie} {alt_ingredient.unit.base_name}</td>
        </tr>
    );
}