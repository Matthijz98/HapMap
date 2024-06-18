import {useState, useEffect, useRef} from 'react';
import SearchResults from "./SearchResults";
import SearchFilters from "./SearchFilters.tsx";
import {useStore} from "@nanostores/react";
import {activeFiltersStore} from "../stores/searchStores.ts";

const Search = (props) => {
    const [filters, setFilters] = useState([]);
    const [pagefind, setPagefind] = useState(null);
    const [query, setQuery] = useState('');
    const [resultsOBJ, setResultsOBJ] = useState(null);
    let timeoutId: any = null;
    const searchInput = useRef(null);

    const activeFilters = useStore(activeFiltersStore)

    const recipe_count = props.recipe_count;

    const search = async (text: string) => {
        if (pagefind) {
            let results = await pagefind.debouncedSearch(text, activeFilters);
            setResultsOBJ(results.results);

            // Clear the timeout if it's already set.
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Set the timeout to execute the umami.trackEvent after 3 seconds.
            timeoutId = setTimeout(() => {
                try {
                    umami.trackEvent('search', {
                        query: text,
                        results: results.results.length
                    });
                } catch (e) {
                }
            }, 2000);
        }
    }

    useEffect(() => {
        const fetchPagefind = async () => {
            // @ts-ignore
            const pagefindModule = await import("/pagefind/pagefind.js");
            setPagefind(pagefindModule);
            pagefindModule.init();

            // Fetch the filters and set them in the state
            const filters = await pagefindModule.filters();
            setFilters(filters);
        }
        fetchPagefind();
    }, []);

    return (
        <div>
            <input className="w-full bg-slate-300 rounded px-2 py-2 placeholder:font-medium placeholder:text-slate-500" value={query} ref={searchInput}
                   placeholder={`Zoek door alle ${recipe_count} recepten`}
                   onChange={(e) => {
                       setQuery(e.target.value);
                       search(e.target.value);
                   }}
                   autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
            </input>
            <SearchFilters filters={filters}/>
            <SearchResults results={resultsOBJ}/>
        </div>
    );
}

export default Search;