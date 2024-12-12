import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.URL_API}search?q=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <>
            <form role="search" className="search" onSubmit={handleSearch}>
                <label htmlFor="site-search" className='site-search'></label>
                <input
                    type="search"
                    title="Recherche par mots-clés"
                    placeholder="Rechercher..."
                    id="site-search"
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="search-results">
                {results.map((result, index) => (
                    <div key={index}>
                        {result.type === 'campain' ? (
                            <div className='container-search'>
                                <a className="repo" href={`/campagne/${result.id}`} >
                                    <h3>Campagne: {result.name}</h3>
                                    <p>Lieu: {result.place}</p>
                                    <p>Date de début: {result.date_begin}</p>
                                    <p>Date de fin: {result.date_end}</p>
                                    <img loading="lazy" src={`${process.env.URL_API}${result.picture}`} />
                                </a>
                            </div>
                        ) : (
                            <div className='container-search'>
                                <a className="repo" href={`/arbre/${result.id}`} >
                                    <h3>Arbre: {result.race}</h3>
                                    <p>Prix: {result.price}</p>
                                    <p>Description: {result.description}</p>
                                    <img loading="lazy" src={`${process.env.URL_API}${result.picture}`} />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Search;
