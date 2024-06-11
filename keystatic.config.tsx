import {config, fields, collection} from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        recipes: collection({
            path: 'src/content/recipes/*',
            label: 'Recipes',
            slugField: 'title',
            format: {contentField: 'content'},
            schema: {
                title: fields.slug({
                    name: {label: 'Titel', description: 'De titel van het recept', validation: {isRequired: true}},
                    slug: {label: 'Slug', description: 'De slug van het recept (wordt gebruikt in de url) en autmatisch gegenereerd op basis van de titel'}
                }),
                image: fields.image({label: 'Foto'}),

                category: fields.select({
                    label: 'Categorie',
                    options: [{label: 'Hoofdgerechten', value: 'Hoofdgerechten'}],
                    defaultValue: 'Hoofdgerechten',
                }),

                time_minutes: fields.integer({label: 'Time in minutes'}),
                created_at: fields.datetime({label: 'Aangemaakt op', validation: {isRequired: true}, defaultValue: {kind: 'now'}}),
                ingredients: fields.array(
                    fields.object({
                        ingredient: fields.relationship({label: 'Ingredient', collection: 'ingredients'}),
                        amount: fields.integer({label: 'Amount', validation: {isRequired: true}}),
                        unit: fields.relationship({label: 'Unit', collection: 'units'}),
                        alt_ingredients: fields.array(
                            fields.object({
                                for_allergy: fields.relationship({label: 'For allergy', collection: 'allergies'}),
                                ingredient: fields.relationship({label: 'Ingredient', collection: 'ingredients'}),
                                amount: fields.integer({label: 'Amount', validation: {isRequired: true}}),
                                unit: fields.relationship({label: 'Unit', collection: 'units'}),
                            })
                        ),
                    }, {label: 'Ingredient'})
                    , {
                        label: 'ingredienten',
                        itemLabel: (props) => `${props.fields.ingredient.value} - ${props.fields.amount.value} ${props.fields.unit.value}`
                    }),
                content: fields.markdoc({label: 'Het recept', description: 'De inhoud van het recept'}),
            },
        }),
        ingredients: collection({
            path: 'src/content/ingredients/*',
            label: 'Ingredients',
            slugField: 'name',
            format: {data: 'json'},
            schema: {
                name: fields.slug({
                    name: {
                        label: 'Name',
                        description: 'Dit is de naam van het ingredient',
                        validation: {isRequired: true},
                    },
                }),
                allergies: fields.relationship({label: 'Allergies', collection: 'allergies'}),
                alt_for: fields.relationship({label: 'Alt for', collection: 'allergies'}),
            },
        }),
        units: collection({
            path: 'src/content/units/*',
            label: 'Units',
            slugField: 'base_name',
            format: {data: 'json'},
            schema: {
                milli_unit: fields.text({label: 'Milli unit'}),
                base_name: fields.text({label: 'Base name', validation: {isRequired: true}}),
                kilo_unit: fields.text({label: 'Kilo unit'}),
                tone_unit: fields.text({label: 'Tone unit'}),
            },
        }),
        allergies: collection({
            path: 'src/content/allergies/*',
            slugField: 'name',
            label: 'Allergies',
            format: {data: 'json'},
            schema: {
                name: fields.text({label: 'Name', validation: {isRequired: true}}),
                alt_name: fields.text({label: 'Alt name', validation: {isRequired: true}}),
            },
        }),
    },
});