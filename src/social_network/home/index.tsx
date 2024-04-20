import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../navigation';
import * as client from './client';
import { Recipe } from './client';
import './index.css';
import { CiBowlNoodles } from "react-icons/ci";

function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
    const [profile, setProfile] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 'USER'
    });

    const navigate = useNavigate();

    const fetchRecipes = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
            const userRecipes = await client.findRecipeByUser(account);
            setUserRecipes(userRecipes);
            const allRecipes = await client.findAllRecipes();
            setRecipes(allRecipes);
        } catch (error: any) {
            if (error.message === 'Unauthorized') {
                navigate('/Home/Login');
            } else {
                console.error('Error fetching profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    // Check if user is signed in
    const isLoggedIn = profile.username !== ''; 

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <h1 className="mb-4">Home</h1>
                <hr />
                {isLoggedIn && (
                    <>
                        <h2>Your Recipes</h2>
                        <div className="row mt-4">
                            {userRecipes.slice(0, 4).map((recipe) => (
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
                    </>
                )}
                
                <h2>Recent Posts</h2>
                <div className="row mt-4">
                    {recipes.slice(-2).map((recipe) => (
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

export default Home;
