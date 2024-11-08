import {StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    document: {
    },
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
    recipe_header: {
        fontSize: '30px',
        textAlign: 'center',
        paddingBottom: '15px'
    },
    recipe_sub_header: {
        fontSize: '15px',
        fontWeight: 'black',
        paddingBottom: '5px'
    },
    columns: {
        flexDirection: 'row'
    },
    column: {
        flex: 1,
    },
    text: {
        fontSize: '12px',
        textAlign: 'justify'
    }
});