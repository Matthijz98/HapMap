import Ingredient from "./Ingredient.tsx";
import type {RecipeIngredientType} from '../../content/config.ts';

export default function Ingredients({ingredients}: {ingredients: RecipeIngredientType[]}) {
    return (
        <div className={"bg-slate-200 rounded mb-4 overflow-x-auto"}>
            <table className={'w-full text-nowrap whitespace-nowrap'}>
                <thead className={'text-left'}>
                <tr className={'border-b-2 border-slate-400'}>
                    <th className={"p-2"}>Ingredient</th>
                    <th className={"p-2"}>Allergieën</th>
                    <th className={"p-2"}>Hoeveelheid p.p.</th>
                    <th className={"p-2"}>Totaal</th>
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