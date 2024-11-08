import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles } from './styles';

export const FrontPage = () => (
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text style={styles.h1}>HapMap.nl</Text>
            <Text style={styles.h2}>Recepten voor groepen</Text>
        </View>
    </Page>
);