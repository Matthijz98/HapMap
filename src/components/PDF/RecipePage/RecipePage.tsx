import {Page, Text, View} from "@react-pdf/renderer";
import {styles} from "../styles.ts";
import React from "react";
import {Simulate} from "react-dom/test-utils";
import {Ingredients} from "./Ingredients.tsx";

export const RecipePage= ({ recipe }) => (
    <Page>
        <View style={styles.section}>
            <Text style={styles.recipe_header}>{recipe.title}</Text>
            {/* Add 2 columns for the recipe info and ingredients */}
            <View style={styles.columns}>
                <View style={styles.column}>
                    <Text style={styles.recipe_sub_header}>Ingrediënten</Text>
                    <Ingredients ingredients={recipe.ingredients}></Ingredients>
                </View>
                <View style={styles.column}>
                    <Text style={styles.recipe_sub_header}>Recept info</Text>
                    <Text style={styles.text}>Categorie: {recipe.category}</Text>
                    <Text style={styles.text}>Bereidingstijd: {recipe.preparation_time} minuten</Text>
                    <Text style={styles.text}>Aantal personen: {recipe.servings}</Text>
                    <Text style={styles.text}>Allergenen: </Text>
                </View>
            </View>
            <Text style={[styles.recipe_sub_header, {paddingTop: '10px'}]}>Omschrijving</Text>
            <Text style={styles.text}>

            </Text>
        </View>
    </Page>
);