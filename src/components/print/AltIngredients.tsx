import AltIngredient from './AltIngredient';
import type {AltIngredientType} from "../../content/config.ts";

export default function AltIngredients(alt_ingredients: any) {
    return (
        <ul>
                {alt_ingredients.alt_ingredients.map((alt_ingredient: object, index: number) => (
                    <AltIngredient alt_ingredient={alt_ingredient} key={index}/>
                ))}
        </ul>
    );
}