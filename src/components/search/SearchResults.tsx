export default function SearchResults({results}: any) {
    return (
        <div>
            {results.map(result => (
                <div key={result.id}>
                    <h4>{result.title}</h4>
                    <p>{result.description}</p>
                </div>
            ))}
        </div>
    );
}