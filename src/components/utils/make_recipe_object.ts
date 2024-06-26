import {getEntry} from 'astro:content';
import type {RecipeType} from '../../content/config';

export async function makeRecipeObject(slug: string): Promise<RecipeType> {
    let recipe: any = await getEntry('recipes', slug);

    if (!recipe) {
        throw new Error('Recipe not found');
    }

    for (let ingredient of recipe.data.ingredients) {
        let ingredientData = await getEntry(ingredient.ingredient);

        if (ingredientData) {
            ingredient.ingredient = ingredientData.data;

            let ingredientAllergyData = [];
            if (ingredient.ingredient.allergies) {
                for (let allergy of ingredient.ingredient.allergies) {
                    let allergyData = await getEntry(allergy);
                    if (allergyData) {
                        ingredientAllergyData.push(allergyData.data);
                    }
                }
                ingredient.ingredient.allergies = ingredientAllergyData;
            }
        }

        if (ingredient.alt_ingredients?.length > 0) {
            for (let altIngredient of ingredient.alt_ingredients) {
                let altIngredientData = await getEntry(altIngredient.ingredient);
                if (altIngredientData) {
                    altIngredient.ingredient = altIngredientData.data;

                    // Fetch full data for for_allergy and alt_for
                    let forAllergyData = await getEntry(altIngredient.for_allergy);
                    if (forAllergyData) {
                        altIngredient.for_allergy = forAllergyData.data;
                    }

                    if (altIngredient.alt_for) {
                        let altForData = await getEntry(altIngredient.alt_for);
                        if (altForData) {
                            altIngredient.alt_for = altForData.data;
                        }
                    }
                    // Fetch full data for unit
                    let unitData = await getEntry(altIngredient.unit);
                    if (unitData) {
                        altIngredient.unit = unitData.data;
                    }
                }
            }
        }

        if (ingredient.unit) {
            let unitData = await getEntry(ingredient.unit);
            if (unitData) {
                ingredient.unit = unitData.data;
            }
        }
    }

    // print the full recipe object
    // console.log(JSON.stringify(recipe.data, null, 4));

    return recipe.data;
}