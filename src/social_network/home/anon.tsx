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
                <Link to="/Login" className="btn btn-primary btn-logout">
                    Sign Up / Log In
                </Link>
                <h1 className="mb-4">Home</h1>
                <hr />
                <h3>Recent Posts</h3>
                <p> Check out some recent posts from our other users:
                    <br /> If you want to share your own special recipes, sign up for an account or log in!
                </p>
                <div className="row mt-4">
                    {recipes.slice(-4).map((recipe) => (
                        <div key={recipe._id} className="col-md-6 mb-4">
                            <div className="card">
                                <Link to={`/Recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
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