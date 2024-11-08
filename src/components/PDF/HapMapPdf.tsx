import React, { useEffect, useState } from 'react';
import {Page, Text, View, Document} from '@react-pdf/renderer';
import {styles} from './styles';
import {FrontPage} from "./FrontPage.tsx";
import {RecipePage} from "./RecipePage/RecipePage.tsx";
import { getCollection } from 'astro:content';
import { makeRecipeObject } from '../utils/make_recipe_object.ts';
import type {RecipeType} from "../../content/config.ts";

const recipeCollection = await getCollection('recipes');
const recipePromises = recipeCollection.map(async (recipe) => {
    const additionalData = await makeRecipeObject(recipe.slug);
    const { Content } = await recipe.render();
    console.log(Content)
    return { ...additionalData, Content };
});
const recipes: RecipeType[] = await Promise.all(recipePromises);


export const HapMapPdf =  () => {
    return (
        <Document style={styles.document}>
            <FrontPage/>
            {recipes.map((recipe, index) => (
                <RecipePage key={index} recipe={recipe} />
            ))}
        </Document>
    );
};
