import {useState, useEffect, useRef} from 'react';
import SearchResults from "./SearchResults";

const Search = (props) => {
    const [pagefind, setPagefind] = useState(null);
    const [query, setQuery] = useState('');
    const [resultsOBJ, setResultsOBJ] = useState(null);
    let timeoutId: any = null;
    const searchInput = useRef(null);

    const recipe_count = props.recipe_count;

    const search = async (text: string) => {
        if (pagefind) {
            let results = await pagefind.debouncedSearch(text);
            if(results){
                setResultsOBJ(results.results);
            }

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
            <SearchResults results={resultsOBJ} searchInput={query}/>
        </div>
    );
}

export default Search;