import { persistentAtom } from '@nanostores/persistent'

// Create a store for the visibility state of the filters
export const filtersVisibilityStore = persistentAtom('filtersVisibility', false, {
    encode: JSON.stringify,
    decode: JSON.parse,
});


// Create a store for the active filters
export const activeFiltersStore = persistentAtom('activeFilters', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const buildFilterObject = () => {
    const activeFilters = activeFiltersStore.get();
    const filterObject = { filters: {} };

    activeFilters.forEach(filter => {
        const [category, value] = filter.split('-');
        filterObject.filters[category] = value;
    });

    return filterObject;
}