import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import './index.css';
import { Link } from 'react-router-dom';

export default function SpoonacularSearch() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    interface Recipe {
        id: number;
        title: string;
        image: string;
        imageType: string;
    }

    const apiKey = 'cf8354d5713e462aa873fd607f939bff';

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${query}`);
            setSearchResults(response.data.results);
        } catch (err: any) {
            setError(err.message);
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
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {searchResults.map((recipe) => (
                        <div key={recipe.id} className="col">
                            <Link to={`/Recipes/Details/${recipe.id}`} style={{ textDecoration: 'none'}}>
                            <div className="card">
                                <img src={`https://img.spoonacular.com/recipes/${recipe.image}`} className="card-img-top spoonacularCard" style={{ objectFit: 'cover', height: '200px' }} alt={recipe.title} />
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
};