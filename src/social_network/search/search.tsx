import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../navigation';
import { Recipe } from './client';
import * as client from './client';
import { CiBowlNoodles } from 'react-icons/ci';
import "./index.css"

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            const recipes = await client.findAllRecipes();
            setAllRecipes(recipes);
        };

        fetchAllRecipes();
    }, []);

    useEffect(() => {
        const filterRecipes = () => {
            const filtered = allRecipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRecipes(filtered);
        };

        filterRecipes();
    }, [searchQuery, allRecipes]);

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <h1 className="mb-4">Search Recipes</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery ? (
                    filteredRecipes.length === 0 ? (
                        <p>No recipes found. Try another search.</p>
                    ) : (
                        <div className="row mt-4">
                            {filteredRecipes.slice(0,9).map((recipe) => (
                                <div key={recipe._id} className="col-lg-3 col-md-4 col-6 mb-4">
                                    <div className="card search-card">
                                        <Link to={`/Recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card-body">
                                                <h5 className="search-card-title text-truncate" style={{ maxWidth: '100%' }}>{recipe.name}</h5>
                                                <p className="search-card-text" style={{ maxWidth: '100%' }}>{recipe.description}</p>
                                                <CiBowlNoodles className="card-icon text-right position-absolute bottom-0 end-0" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="row mt-4">
                        {allRecipes.slice(0,9).map((recipe) => (
                            <div key={recipe._id} className="col-lg-4 col-6 mb-4">
                                <div className="card search-card">
                                    <Link to={`/Recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card-body">
                                            <h5 className="search-card-title" style={{ maxWidth: '100%' }}>{recipe.name}</h5>
                                            <p className="search-card-text" style={{ maxWidth: '100%' }}>{recipe.description}</p>
                                            <CiBowlNoodles className="card-icon text-right position-absolute bottom-0 end-0" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
