import {z, defineCollection, reference} from 'astro:content';

export const recipeSchema = z.object({
    title: z.string(),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    time_minutes: z.number().optional(),
    created_at: z.date().optional(),
    ingredients: z.array(z.object({
        ingredient: reference('ingredients'),
        amount: z.number(),
        unit: reference('units'),
        alt_ingredients: z.array(z.object({
            for_allergy: reference('allergies'),
            ingredient: reference('ingredients'),
            amount: z.number(),
            unit: reference('units'),
        })).optional(),
    })).optional()
})

const recipesCollection = defineCollection({
    type: 'content',
    schema: recipeSchema,
});

export const IngredientSchema = z.object({
    name: z.string(),
    allergies: z.array(reference('allergies')).optional(),
    alt_for: reference('allergies').optional(),
});

const ingredientsCollection = defineCollection({
    type: 'data',
    schema: IngredientSchema,
});

const UnitSchema = z.object({
    milli_unit: z.string().optional(),
    base_name: z.string(),
    kilo_unit: z.string().optional(),
    tone_unit: z.string().optional(),
});

const unitsCollection = defineCollection({
    type: 'data',
    schema: UnitSchema,
});

const AllergySchema = z.object({
    name: z.string(),
    alt_name: z.string()
})

const allergyCollection = defineCollection({
    type: 'data',
    schema: AllergySchema,
});

export const collections = {
    'recipes': recipesCollection,
    'ingredients': ingredientsCollection,
    'units': unitsCollection,
    'allergies': allergyCollection,
};