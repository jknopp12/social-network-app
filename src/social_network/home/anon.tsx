import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../navigation';
import * as client from './client';
import { Recipe } from './client';
import './index.css';
import { CiBowlNoodles } from "react-icons/ci";


export default function HomeAnon() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>({
        _id: '',
        name: '',
        description: '',
        user: '',
        ingredients: '',
        instructions: ''
    });

    const handleReadMore = async () => {
        await client.getRecipeById(recipe._id);
        navigate(`/Recipe/${recipe._id}`);
    };


    const fetchRecipes = async () => {
        const recipes = await client.findAllRecipes();
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <h1 className="mb-4">Home</h1>
                <hr />
                <h2>Recent Posts!</h2>
                <div className="row mt-4">
                {recipes.slice(-4).map((recipe) => (
                        <div key={recipe._id} className="col-md-6 mb-4">
                            <div className="card">
                                <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.name}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                        <CiBowlNoodles className="card-icon text-right position-absolute bottom-0 end-0" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}