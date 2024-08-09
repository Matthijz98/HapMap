import {filtersVisibilityStore, activeFiltersStore, buildFilterObject} from '../stores/searchStores'
import {useStore} from "@nanostores/react";
import { useEffect } from 'react'

export default function SearchFilters({ filters }) {
    const isVisible = useStore(filtersVisibilityStore)
    const activeFilters = useStore(activeFiltersStore)

    console.log('activeFilters', activeFilters)
    console.log('filters', filters)

    const toggleVisibility = () => {
        filtersVisibilityStore.set(!isVisible)
    }

    const toggleFilter = (category) => {
        const activeFilters = activeFiltersStore.get();
        const isActive = activeFilters.filters && activeFilters.filters.category === category;

        if (isActive) {
            // If the filter is active, remove it
            activeFiltersStore.set({});
        } else {
            // If the filter is not active, add it
            activeFiltersStore.set({ filters: { category } });
        }
    }

    const categories = Object.entries(filters)

    return (
        <div className={'text-slate-300 bg-slate-700 rounded mt-1 p-2'}>
            <div className={isVisible ? '' : 'hidden'}>
                <h3>Filters:</h3>
                <div className={'flex gap-2 flex-wrap'}>
                    <h4>Categorie:</h4>

                    {filters.category && Object.entries(filters.category).map(([key, value]) => (
                        <button
                            key={key}
                            className={`rounded-full text-black px-2 py-1 text-xs text-nowrap ${activeFilters.filters && activeFilters.filters.category === key ? 'bg-green-500' : 'bg-white'}`}
                            onClick={() => toggleFilter(key)}
                        >
                            {key} - {value}
                        </button>
                    ))}
                </div>
            </div>

            <button className={'w-full text-center'} onClick={toggleVisibility}>
                {isVisible ? 'Hide filters' : 'Show filters'}
            </button>
        </div>
    )
}