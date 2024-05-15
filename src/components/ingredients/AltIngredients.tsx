import AltIngredient from './AltIngredient';

export default function AltIngredients(alt_ingredients) {
    return (
        <table className={'bg-slate-400 w-full rounded shadow'}>
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
                    <AltIngredient alt_ingredient={alt_ingredient} key={index} />
                ))}
            </tbody>
        </table>
    );
}