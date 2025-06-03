import { getCollection } from 'astro:content';
import { makeRecipeObject } from '../../../components/utils/make_recipe_object';

export const prerender = true;

export async function getStaticPaths() {
    const recipes = await getCollection('recipes');
    return recipes.map(entry => ({
        params: { slug: entry.slug }, props: { entry },
    }));
}

export async function GET({ params, props }) {
    const { entry } = props;
    const recipeData = await makeRecipeObject(entry.slug);
    
    return new Response(JSON.stringify(recipeData), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}