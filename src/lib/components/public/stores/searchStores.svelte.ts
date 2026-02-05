import '@macfja/svelte-persistent-runes'

export const filtersVisibilityStore = $persist(false, 'filtersVisibility');


export const activeFiltersStore = $persist([],'activeFilters');

export const buildFilterObject = () => {
    const filterObject = { filters: {} };

    activeFiltersStore.forEach(filter => {
        const [category, value] = filter.split('-');
        filterObject.filters[category] = value;
    });

    return filterObject;
}