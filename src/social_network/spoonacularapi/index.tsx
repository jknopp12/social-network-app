import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

export default function SpoonacularSearch() {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);

    interface Recipe {
        id: number;
        title: string;
        image: string;
        imageType: string;
    }

    const apiKey = '5b932759591e406d84e164ce05aa8c8d';

    useEffect(() => {
        const hash = window.location.hash.slice(2);
        if (hash && hash.startsWith('Spoonacular/')) {
            const decodedHash = decodeURIComponent(hash.slice(12)); // Remove "Spoonacular/" from the hash
            setQuery(decodedHash);
            handleSearch(decodedHash);
        }
    
        const handleHashChange = () => {
            const newQuery = decodeURIComponent(window.location.hash.slice(2));
            if (newQuery.startsWith('Spoonacular/')) {
                setQuery(newQuery.slice(12)); // Remove "Spoonacular/" from the new query
            }
        };
    
        window.addEventListener('hashchange', handleHashChange);
    
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    

    const handleSearch = async (queryToSearch: string) => {
        try {
            setLoading(true);
            setError(null);
    
            const response = await axios.get(`https://api.spoonacular.com/recipes/search`, {
                params: {
                    apiKey: apiKey,
                    query: queryToSearch,
                },
            });
            setSearchResults(response.data.results);
            window.history.pushState({}, '', `#/Spoonacular/${encodeURIComponent(queryToSearch)}`);
    
        } catch (err: any) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <h1 className="mb-4">Spoonacular Search</h1>
                <p>Search for recipe ideas from Spoonacular!</p>
                <hr />
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for recipes..."
                />
                <button className="btn btn-primary" onClick={() => handleSearch(query)}>
                    Search
                </button>

                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">Error: {error}</p>}

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {searchResults.map((recipe) => (
                        <div key={recipe.id} className="col">
                            <Link to={`/Recipes/Details/${recipe.id}`} style={{ textDecoration: 'none' }}>
                                <div className="card">
                                    <img
                                        src={`https://img.spoonacular.com/recipes/${recipe.image}`}
                                        className="card-img-top spoonacularCard"
                                        style={{ objectFit: 'cover', height: '200px' }}
                                        alt={recipe.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
