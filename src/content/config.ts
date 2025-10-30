import {z, defineCollection, reference} from 'astro:content';

const Categories = ["Hoofdgerechten", "Bijgerechten", "Toetjes"] as const;

export const AltIngredientSchema = z.object({
    for_allergy: reference('allergies'),
    ingredient: reference('ingredients'),
    amount: z.number(),
    unit: reference('units'),
});

export const recipeIngredientSchema =
    z.object({
            ingredient: reference('ingredients'),
            amount: z.number().optional(),
            unit: reference('units').optional(),
            alt_ingredients: z.array(AltIngredientSchema).optional(),
        }
    )
;

const NoteSchema = z.object({
    type: z.enum(['tip', 'warning', 'info']),
    content: z.string(),

});

export const recipeSchema = z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    notes: z.array(NoteSchema).optional(),
    category: z.enum(Categories),
    time_minutes: z.number().optional(),
    created_at: z.date().optional(),
    ingredients: z.array(recipeIngredientSchema.optional()),
})

const recipesCollection = defineCollection({
    type: 'content',
    schema: recipeSchema,
});

export const IngredientSchema = z.object({
    name: z.string(),
    multiple_name: z.string().optional(),
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

export type AllergyType = z.infer<typeof AllergySchema>;
export type UnitType = z.infer<typeof UnitSchema>;
export type NoteType = z.infer<typeof NoteSchema>;
export type AltIngredientType = {
    for_allergy: AllergyType;
    ingredient: IngredientType;
    amount: number;
    unit: UnitType;
};

export type IngredientType = {
    name: string;
    allergies: AllergyType[];
    alt_for: AllergyType | null;
};

export type RecipeIngredientType = {
    ingredient: IngredientType;
    amount: number;
    unit: UnitType;
    alt_ingredients: AltIngredientType[];
};

export type RecipeType = {
    title: string;
    image: string | null;
    category: string;
    tags: string[] | null;
    time_minutes: number | null;
    created_at: Date | null;
    ingredients: RecipeIngredientType[];
};