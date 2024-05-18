import { useEffect, useState } from 'react';

export default function SearchResults({results}: any) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (results) {
                const newData = await Promise.all(results.map(result => result.data()));
                setData(newData);
            }
        }
        fetchData();
    }, [results]);

    return (
        <div className="flex gap-2 flex-col pt-2">

                {data.length > 0 ? data.map((result_data, index) => (
                    <a href={result_data.url} className={'bg-slate-300 p-2 rounded shadow'} key={index}>
                        <h3 className={'text-xl'}>{result_data.meta.title}</h3>
                        {result_data.sub_results.map((sub_result, subIndex) => (
                            result_data.meta.title === sub_result.title ?
                                <p key={subIndex} className="mt-0 mb-0.5 text-sm" dangerouslySetInnerHTML={{ __html: sub_result.excerpt }}></p> :
                                <div key={subIndex} className="pl-1.5">
                                    <a href={sub_result.url}>{sub_result.title}</a><br/>
                                    <p className="mt-0 mb-0.5 text-sm" dangerouslySetInnerHTML={{ __html: sub_result.excerpt }}></p>
                                </div>
                        ))}
                    </a>
                )) : ''}

        </div>
    );
}