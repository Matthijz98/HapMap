import {useStore} from "@nanostores/react";
import {allergies, eaters} from "../stores/eatersStore.ts";
import type {AltIngredientType} from "../../content/config.ts";

export default function AltIngredient(alt_ingredient: any){
    const $eaters = useStore(eaters);
    const $allergies = useStore(allergies);

    const $eatersWithAllergie = alt_ingredient.alt_ingredient.for_allergy ? $allergies[alt_ingredient.alt_ingredient.for_allergy.name] : 0;

    return (
        <li>
            <span className={'font-medium pl-4'}>{alt_ingredient.alt_ingredient.amount * $eatersWithAllergie} {alt_ingredient.alt_ingredient.unit.base_name}</span> - {alt_ingredient.alt_ingredient.ingredient.name}
        </li>
    );
}