import Navigation from "../navigation";
import { useEffect, useState } from "react";
import * as client from "./client";
import { Recipe } from "./client";

function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>({
        _id: "", name: "", description: "", user: "",
        ingredients: "", instructions: ""
    });
    useEffect(() => {
        fetchRecipes();
    }, [])
    const fetchRecipes = async () => {
        const recipes = await client.findAllRecipes();
        setRecipes(recipes);
    };
    // useEffect(() => {
    //     fetchRecipe();
    // }, [])
    // const fetchRecipe = async () => {
    //     const recipe = await client.profile();
    //     setRecipe(recipe);
    // };


    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h1 className="mb-4">Home</h1>
                <hr />
                <h3>Trending Posts</h3>
                <h4>Hey, {recipe.name}!</h4>
                <div className="row mt-4">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-6 mb-4">
                            <p>{recipe.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
