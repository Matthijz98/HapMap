export default function AltIngredient(alt_ingredient){
    return (
        <tr>
            <td>{alt_ingredient.alt_ingredient.ingredient.name}</td>
            <td>{alt_ingredient.alt_ingredient.for_allergy.name}</td>
            <td>{alt_ingredient.alt_ingredient.amount} {alt_ingredient.alt_ingredient.unit.base_name}</td>
            <td>IngredientAlt</td>
        </tr>
    );
}