import React, { useEffect, useState } from 'react';
import Navigation from '../navigation';
import * as client from './client';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './client';
import { User } from './client';

export default function NewPost() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>({
        _id: '',
        name: '',
        description: '',
        user: '',
        ingredients: '',
        instructions: ''
    });
    const navigate = useNavigate();

    const fetchRecipe = async () => {
        const user = await client.profile();
        setRecipe({
            ...recipe,
            user: user._id
        });
    };

    const createRecipe = async () => {
        try {
            await client.createRecipe(recipe);
            navigate("/Profile");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <h1 className="mb-4">New Recipe</h1>
                <hr />
                {recipe && (
                <div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="input form-control" value={recipe.name} onChange={(e) =>
                            setRecipe({ ...recipe, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="input form-control"
                            value={recipe.description}
                            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ingredients" className="form-label">Ingredients</label>
                        <textarea
                            className="input form-control"
                            value={recipe.ingredients}
                            onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructions" className="form-label">Instructions</label>
                        <textarea
                            className="input form-control"
                            value={recipe.instructions}
                            onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={createRecipe}>Create Recipe</button>
                </div>
                )}
            </div>
        </div>
    );
}
