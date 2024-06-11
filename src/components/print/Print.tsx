import {eaters, allergies} from "../stores/eatersStore.ts";
import {useStore} from '@nanostores/react';
import type {AllergyType, RecipeIngredientType} from "../../content/config.ts";
import Ingredients from "./Ingredients.tsx";

const Print = (props) => {
    const $eaters = useStore(eaters);
    const $allergies = useStore(allergies);

    let recipe_allergies = props.ingredients
        .map((ingredient: RecipeIngredientType) => ingredient.ingredient.allergies)
        .flat()
        .filter(Boolean);


    return (
        <>
            <h1 className="text-center font-bold text-3xl">
                {props.title}
            </h1>


            {recipe_allergies.length > 0 &&
                <>
                    <h2 className="font-black text-xl pt-4">Allergenen</h2>
                    <ul>
                        {recipe_allergies.map((allergy: AllergyType) => (
                            <span>{allergy.name}</span>
                        ))}
                    </ul>
                </>
            }


            <h2 className="font-black text-xl pt-4">Eeters</h2>
            <span className={'font-medium'}>Totaal: {$eaters}</span><br/>
            {/* Show the eaters with allergies from the allergy store*/}
            Waarvan met allergie:
            <ul>
                {Object.entries($allergies).map(([key, value]) =>
                        recipe_allergies.some(allergy => allergy.name === key) && (
                            <li key={key}>
                                {key}: {value}
                            </li>
                        )
                )}
            </ul>


            <h2 className="font-black text-xl pt-4">Ingredienten</h2>
            <Ingredients ingredients={props.ingredients}></Ingredients>

            <h2 className="font-black text-xl pt-4">Bereiding</h2>
            <div className="prose max-w-full text-black prose-ul:text-black">
                {props.children}
            </div>

        </>
    );
}

export default Print;
