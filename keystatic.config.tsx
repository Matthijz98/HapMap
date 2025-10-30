import {config, fields, collection} from '@keystatic/core';

export default config({
    storage: {
        kind: 'cloud',
    },
    cloud: {
        project: 'hapmap/hapmap',
    },
    ui: {
        brand: {name: 'HapMap'},
    },
    collections: {
        recipes: collection({
            path: 'src/content/recipes/*',
            label: 'Recepten',
            slugField: 'title',
            format: {contentField: 'content'},
            columns: ['title', 'created_at', 'category'],
            schema: {
                title: fields.slug({
                    name: {label: 'Titel', description: 'De titel van het recept', validation: {isRequired: true}},
                    slug: {
                        label: 'Slug',
                        description: 'De slug van het recept (wordt gebruikt in de url) en autmatisch gegenereerd op basis van de titel'
                    }
                }),
                image: fields.image({
                    label: 'Foto',
                    directory: 'src/assets/images/recipes',
                    publicPath: '@assets/images/recipes/'
                }),

                description: fields.text({
                    label: 'Beschrijving',
                    description: 'Een korte beschrijving van het recept voor SEO en sociale media (ideaal 150-160 karakters)',
                    multiline: true,
                }),

                keywords: fields.text({
                    label: 'Zoekwoorden',
                    description: 'Komma-gescheiden zoekwoorden voor SEO (bijv: pasta, vegetarisch, snel gerecht)',
                }),

                category: fields.select({
                    label: 'Categorie',
                    options: [{label: 'Hoofdgerechten', value: 'Hoofdgerechten'}, {label: "Toetjes", value: "Toetjes"}],
                    defaultValue: 'Hoofdgerechten',
                }),

                notes: fields.array(
                    fields.object({
                        type: fields.select({
                            label: 'Type',
                            options: [
                                {label: 'Tip', value: 'tip'},
                                {label: 'Warning', value: 'warning'},
                                {label: 'Info', value: 'info'},
                            ],
                            defaultValue: 'info',
                        }),
                        content: fields.text({label: 'Content'}),
                    }, {label: 'Note'}),
                    {
                        label: 'Notities',
                        description: 'Dit zijn notities die bij het recept horen',
                        itemLabel: (props) => (props.fields.type.value + ': ' + props.fields.content.value)
                    }
                ),

                time_minutes: fields.integer({label: 'Time in minutes'}),
                created_at: fields.datetime({
                    label: 'Aangemaakt op',
                    validation: {isRequired: true},
                    defaultValue: {kind: 'now'}
                }),
                ingredients: fields.array(
                    fields.object({
                        ingredient: fields.relationship({label: 'Ingredient', collection: 'ingredients'}),
                        amount: fields.number({label: 'Hoeveelheid', validation: {isRequired: false}}),
                        unit: fields.relationship({
                            label: 'Eenheid',
                            collection: 'units',
                            validation: {isRequired: false}
                        }),
                        alt_ingredients: fields.array(
                            fields.object({
                                for_allergy: fields.relationship({label: 'Voor allergie', collection: 'allergies'}),
                                ingredient: fields.relationship({label: 'Ingredient', collection: 'ingredients'}),
                                amount: fields.number({label: 'Hoeveelheid', validation: {isRequired: true}}),
                                unit: fields.relationship({label: 'Eenheid', collection: 'units'}),
                            })
                            , {
                                label: 'Alternative ingredient',
                                description: 'Dit kan gebruikt worden om een alternatief ingredient op te geven',
                                itemLabel: (props) => `${props.fields.ingredient.value} - ${props.fields.amount.value} ${props.fields.unit.value}`
                            }),
                    }, {label: 'Ingredient'})
                    , {
                        label: 'Ingredienten',
                        description: 'De ingredienten van het recept, de hoeveelheden zijn per persoon de site rekent dit om naar het aantal personen dat je opgeeft',
                        itemLabel: (props) => `${props.fields.ingredient.value} - ${props.fields.amount.value} ${props.fields.unit.value}`
                    }),
                content: fields.markdoc({label: 'Het recept', description: 'De inhoud van het recept', options: {
                        image: {
                            directory: 'src/assets/images/recipes',
                            publicPath: '@assets/images/recipes/'
                        }
                    }}),
            },
        }),
        ingredients: collection({
            path: 'src/content/ingredients/*',
            label: 'Ingredienten',
            slugField: 'name',
            format: {data: 'json'},
            schema: {
                name: fields.slug({
                    name: {
                        label: 'Naam',
                        description: 'Dit is de naam van het ingredient in enkelvoud',
                        validation: {isRequired: true},
                    },
                }),
                multiple_name: fields.text({label: 'Meervoud naam'}),
                allergies: fields.array(fields.relationship({
                    label: 'Allergies',
                    collection: 'allergies'
                }), {label: 'Bevat allergieën', itemLabel: (props) => props.value ? props.value : ''}),
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
            label: 'Allergenen',
            format: {data: 'json'},
            schema: {
                name: fields.slug({
                    name: {
                        label: 'Name',
                        description: 'Dit is de naam van het allergie',
                        validation: {isRequired: true},
                    },
                }),
                alt_name: fields.text({label: 'Alt name', validation: {isRequired: true}}),
            },
        }),
    },
});