import { filtersVisibilityStore, activeFiltersStore } from '../stores/searchStores'
import {useStore} from "@nanostores/react";
import { useEffect } from 'react'

export default function SearchFilters({ filters }) {
    const isVisible = useStore(filtersVisibilityStore)
    const activeFilters = useStore(activeFiltersStore)
    // const categories = [] // TODO: Get this from pagefind filters

    useEffect(() => {
        // TODO: Get categories from pagefind filters and set them in the state
    }, [])

    const toggleVisibility = () => {
        filtersVisibilityStore.set(!isVisible)
    }

    const toggleFilter = (category) => {
        const isActive = activeFilters.includes(category)
        activeFiltersStore.set(
            isActive ? activeFilters.filter(f => f !== category) : [...activeFilters, category]
        )
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
                            className={`rounded-full text-black px-2 py-1 text-xs text-nowrap ${activeFilters.includes(key) ? 'bg-green-500' : 'bg-white'}`}
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