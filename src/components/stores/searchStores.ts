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
