import {IngredientSchema} from '../content/config.ts';

export default function Ingredients({ingredient}: any) {
    return (
        <tr>
            <td>{ingredient.ingredient.name}</td>
            <td>{ingredient.amount} {ingredient.unit.base_name}</td>
            <td></td>
        </tr>
    );
}