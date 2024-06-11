import AltIngredient from './AltIngredient';

export default function AltIngredients(alt_ingredients) {
    return (
        <ul>
                {alt_ingredients.alt_ingredients.map((alt_ingredient, index) => (
                    <AltIngredient alt_ingredient={alt_ingredient} key={index}/>
                ))}
        </ul>
    );
}