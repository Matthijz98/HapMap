import {getEntries, getEntry} from 'astro:content';
import { recipeSchema, IngredientSchema } from '../../content/config';

// this function can be used to get a recipe object from the content collection
// This function should combine all related data to one big object
export async function makeRecipeObject(slug: string) {
    let recipe: any = await getEntry('recipes', slug);

    if (!recipe) {
        return null;
    }

    for (let ingredient of recipe.data.ingredients) {
        let ingredientData = await getEntry(ingredient.ingredient);

        if (ingredientData) {
            ingredient.ingredient = ingredientData.data;
        }

        if (ingredient.alt_ingredients) {
            for (let altIngredient of ingredient.alt_ingredients) {
                let altIngredientData = await getEntry(altIngredient.ingredient);
                if (altIngredientData) {
                    altIngredient.ingredient = altIngredientData.data;
                }
            }
        }

        let unitData = await getEntry(ingredient.unit);
        if (unitData) {
            ingredient.unit = unitData.data;
        }
    }

    return recipe;
}