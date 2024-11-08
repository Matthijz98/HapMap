import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    h1: {
        fontSize: '90px',
        textAlign: 'center'
    },
    h2: {
        fontSize: '40px',
        textAlign: 'center'
    },
    colums: {
        flexDirection: 'row'
    }
});

export const HapMapPdf = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.h1}>HapMap.nl</Text>
                <Text style={styles.h2}>Recepten voor groepen</Text>
            </View>
        </Page>
        <Page>
            <View style={styles.section}>
                {/* Add 2 columns for the recipe info and ingredients */}
                <View>
                </View>
                <Text style={styles.h2}>Recept1</Text>
            </View>
        </Page>
    </Document>
);
