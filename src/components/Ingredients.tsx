import Ingredient from "./Ingredient";
import type {RecipeIngredientType} from '../content/config.ts';

export default function Ingredients({ingredients}: {ingredients: RecipeIngredientType[]}) {
    return (
        <div className={"bg-slate-200 rounded mb-4 p-2"}>
            <table className={'w-full'}>
                <thead className={'text-left'}>
                <tr>
                    <th>Ingredient</th>
                    <th>Allergieën</th>
                    <th>Hoeveelheid p.p.</th>
                    <th>Totaal</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ingredient: any, index: number) => (
                    <Ingredient ingredient={ingredient} key={index}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}