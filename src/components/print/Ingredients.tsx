import Ingredient from "./Ingredient.tsx";
import type {RecipeIngredientType} from '../../content/config.ts';

export default function Ingredients({ingredients}: { ingredients: RecipeIngredientType[] }) {
    return (
        <ul>
            {ingredients.map((ingredient: any, index: number) => (
                <Ingredient ingredient={ingredient} key={index}/>
            ))}
        </ul>
    );
}