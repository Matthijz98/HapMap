import Ingredient from "./Ingredient";

export default function Ingredients({ingredients}: any) {
    return (
        <div className={"bg-slate-200 rounded mb-2 p-2"}>
            <table className={'w-full'}>
                <thead className={'text-left'}>
                <tr>
                    <th>Ingredient</th>
                    <th>Amount p.p.</th>
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