export default function AltIngredient(alt_ingredient){
    return (
        <tr>
            <td>{alt_ingredient.alt_ingredient.ingredient.name}</td>
            <td>{alt_ingredient.alt_ingredient.for_allergy.id}</td>
            <td>{alt_ingredient.alt_ingredient.amount} {alt_ingredient.alt_ingredient.unit.id}</td>
            <td>IngredientAlt</td>
        </tr>
    );
}