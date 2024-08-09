import {useEffect, useState} from 'react';

interface Result {
    data: () => Promise<ResultData>;
}

interface ResultData {
    url: string;
    meta: {
        title: string;
    };
    filters: {
        ingredient: string[];
    };
}

export default function SearchResults({results, searchInput}: {results: Result[], searchInput: string}) {
    const [data, setData] = useState<ResultData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (results) {
                const newData = await Promise.all(results.map((result: Result) => result.data()));
                setData(newData);
            }
        }
        fetchData();
    }, [results]);

    return (
        <div className="flex gap-2 flex-col pt-2">
            {data.length > 0 ? data.map((result_data, index) => (
                <a href={result_data.url} className={'bg-slate-300 p-2 rounded shadow'} key={index}>
                    <h3 className={'text-xl font-bold'}>{result_data.meta.title}</h3>
                    <div className={'flex flex-wrap gap-1 mt-1.5'}>
                        <div className={'px-1 py-0.5 text-sm'}>Ingredienten: </div>
                        {result_data.filters.ingredient.map((filter, filterIndex) => (
                            <span key={filterIndex}
                                  className={'bg-slate-400 px-1 py-0.5 rounded text-white text-sm'}>{filter}</span>
                        ))}
                    </div>
                </a>
            )) : (searchInput.length > 0) ? <div className={'bg-slate-300 p-2 rounded shadow'}>Geen recepten gevonden</div> : null}
        </div>
    );
}