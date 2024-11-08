import {styles} from "../styles.ts";
import { Page, Text, View, Document } from '@react-pdf/renderer';

export const Ingredients = ({ ingredients }) => (
    <View>
        {ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
                {ingredient.ingredient.name}: {ingredient.amount} {ingredient.unit?.base_name ?? ''}
            </Text>
        ))}
    </View>
);