import AltIngredient from './AltIngredient';

export default function AltIngredients(alt_ingredients) {
    return (
        <div className={'bg-slate-400 rounded shadow p-1'}>
            <table className={'w-full'}>
                <thead>
                <tr className={'font-medium'}>
                    <td>Ingredient</td>
                    <td>Voor allergie</td>
                    <td>Hoeveelheid p.p.</td>
                    <td>Hoeveelheid totaal</td>
                </tr>
                </thead>
                <tbody>
                {alt_ingredients.alt_ingredients.map((alt_ingredient, index) => (
                    <AltIngredient alt_ingredient={alt_ingredient} key={index}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}