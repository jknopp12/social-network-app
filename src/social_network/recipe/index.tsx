// Recipe.js
import Navigation from "../navigation";
import { useParams } from "react-router-dom";
import "./index.css"
import * as client from "./client";
import { Recipe } from "./client";
import { useEffect, useState } from "react";


export default function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe>({
        _id: "", name: "", description: "", user: "", ingredients: "",
        instructions: ""
    });

    const fetchRecipes = async () => {
        const recipes = await client.findAllRecipes();
        setRecipes(recipes);
    };
    useEffect(() => { fetchRecipes(); }, []);

    // Sample post data
    const post = {
        id: 1,
        title: "Delicious Recipe",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel velit eget sem ultrices maximus. Donec vitae mauris eget eros sollicitudin accumsan. Nullam gravida, turpis a suscipit consectetur, eros turpis blandit metus, quis vehicula nulla magna ac eros. Nullam at nunc id nisl semper ullamcorper. Ut tempor purus justo, id pretium nulla viverra at.",
        image: "/images/recipe.jpg",
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        instructions: "Step 1: Lorem ipsum dolor sit amet...\nStep 2: Consectetur adipiscing elit..."
    };

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <h1 className="mb-4">{post.title}</h1>
                <hr/>
                <img src={post.image} className="img-fluid rounded mb-4" alt={post.title} />
                <p>{post.content}</p>
                
                <h3 className="mt-4">{recipe.name}</h3>
                <ul>
                    {post.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <h3 className="mt-4">Instructions</h3>
                <p>{post.instructions}</p>
            </div>
        </div>
    );
}
