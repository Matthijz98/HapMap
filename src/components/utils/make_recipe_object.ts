import {getEntry} from 'astro:content';
import type {RecipeType} from '../../content/config';

// this function can be used to get a recipe object from the content collection
// This function should combine all related data to one big object
export async function makeRecipeObject(slug: string): Promise<RecipeType> {
    let recipe: any = await getEntry('recipes', slug);

    if (!recipe) {
        throw new Error('Recipe not found');
    }

    for (let ingredient of recipe.data.ingredients) {
        let ingredientData = await getEntry(ingredient.ingredient);

        if (ingredientData) {
            ingredient.ingredient = ingredientData.data;
            // add the allergies to the ingredient from the allergy collection with getEntry
            // and replace the allergie data to the ingredient object

            let ingredientAllergyData = [];
            for (let allergy of ingredient.ingredient.allergies) {
                let allergyData = await getEntry(allergy);
                if (allergyData) {
                    ingredientAllergyData.push(allergyData.data);
                }
            }
            ingredient.ingredient.allergies = ingredientAllergyData;
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

    return recipe.data;
}