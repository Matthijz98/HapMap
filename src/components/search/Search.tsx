import {useState, useEffect, useRef} from 'react';
import SearchResults from "./SearchResults";

import {useStore} from '@nanostores/react';
const Search = () => {
    const [pagefind, setPagefind] = useState(null);
    const [query, setQuery] = useState('');
    const [resultsOBJ, setResultsOBJ] = useState(null);
    let timeoutId: any = null;
    const searchInput = useRef(null);

    const search = async (text: string) => {
        console.log('search', text)
        if (pagefind) {
            let results = await pagefind.debouncedSearch(text);
            setResultsOBJ(results.results);

            // Clear the timeout if it's already set.
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Set the timeout to execute the umami.trackEvent after 3 seconds.
            timeoutId = setTimeout(() => {
                try {
                    console.log('search');
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

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }

    return (
        <div>
            <input className="w-full bg-slate-300 rounded px-8 py-2" value={query} ref={searchInput}
                   onChange={(e) => {
                       setQuery(e.target.value);
                       search(e.target.value);
                   }}
                   autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
            </input>
            {/*<SearchResults results={resultsOBJ}/>*/}
        </div>
    );
}

export default Search;