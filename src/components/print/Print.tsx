import {eaters} from "../stores/eatersStore.ts";
import {useStore} from '@nanostores/react';
import type {AllergyType, RecipeIngredientType} from "../../content/config.ts";

const Print = (props) => {
    const $eaters = useStore(eaters);

    let allergies = props.ingredients
        .map((ingredient: RecipeIngredientType) => ingredient.ingredient.allergies)
        .flat()
        .filter(Boolean);

    return (
        <>
            <h1 className="text-center font-bold text-3xl">
                {props.title}
            </h1>


            {allergies.length > 0 &&
                <>
                    <h2 className="font-black text-xl pt-4">Allergenen</h2>
                    <ul>
                        {allergies.map((allergy: AllergyType) => (
                            <span>{allergy.name}</span>
                        ))}
                    </ul>
                </>
            }


            <h2 className="font-black text-xl pt-4">Eeters</h2>
            <span>Totaal: {$eaters}</span>

            <h2 className="font-black text-xl pt-4">Ingredienten</h2>
            <ul>
                <li>10kg aardappelen</li>
            </ul>

            <h2 className="font-black text-xl pt-4">Bereiding</h2>
            <div className="prose max-w-full text-black prose-ul:text-black">
                {props.children}
            </div>

        </>
    );
}

export default Print;
