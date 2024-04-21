import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { Recipe } from "./client";
import * as client from './client';
import { CiBowlNoodles } from "react-icons/ci";
import "./index.css"


export default function RecipeHome() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>({
        _id: '',
        name: '',
        description: '',
        user: '',
        ingredients: [],
        instructions: []
    });

    const fetchRecipes = async () => {
        const recipes = await client.findAllRecipes();
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="d-flex">
        <Navigation />
        <div className="content-container">
            <h1 className="mb-4">Recipes</h1>
            <hr />
            <h3>Recent Recipe Posts</h3>
            <p> Check out some of the cool recipes posted by our users!
                <br /> Click on a recipe to find out more!
            </p>
            <div className="row mt-4">
                {recipes.slice(-8).map((recipe) => (
                    <div key={recipe._id} className="col-md-3 mb-4">
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
    )
}