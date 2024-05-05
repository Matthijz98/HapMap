import Ingredient from "./Ingredient";

export default function Ingredients({ingredients}) {
    return (
        <div className={"bg-slate-200 rounded mb-2 p-2"}>
            {ingredients.map((ingredient, index) => (
                <Ingredient ingredient={ingredient} key={index}/>
            ))}
        </div>
    );
}