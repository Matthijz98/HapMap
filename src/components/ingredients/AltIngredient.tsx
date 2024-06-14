import {useStore} from "@nanostores/react";
import {allergies, eaters} from "../stores/eatersStore.ts";

export default function AltIngredient(alt_ingredient){
    const $eaters = useStore(eaters);
    const $allergies = useStore(allergies);

    const $eatersWithAllergie = alt_ingredient.alt_ingredient.for_allergy ? $allergies[alt_ingredient.alt_ingredient.for_allergy.name] : 0;

    return (
        <tr>
            <td>{alt_ingredient.alt_ingredient.ingredient.name}</td>
            <td>{alt_ingredient.alt_ingredient.for_allergy.name}</td>
            <td>{alt_ingredient.alt_ingredient.amount} {alt_ingredient.alt_ingredient.unit.base_name}</td>
            <td>{alt_ingredient.alt_ingredient.amount * $eatersWithAllergie} {alt_ingredient.alt_ingredient.unit.base_name}</td>
        </tr>
    );
}