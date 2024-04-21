import Navigation from "../navigation";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import * as client from "./client";
import { Recipe } from "./client";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe>({
    _id: "",
    name: "",
    description: "",
    user: "",
    ingredients: [],
    instructions: []
  });

  const getRecipeById = async (id: string) => {
    try {
      const recipe = await client.getRecipeById(id);
      setRecipe(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      getRecipeById(recipeId);
    }
  }, [recipeId]);

  return (
    <div className="d-flex">
      <Navigation />
      <div className="content-container">
        <Link to="/Recipes" className="btn btn-primary btn-logout">
          Click here to view more recipes!
        </Link>
        <Link to={`/Profile/${recipe.user}`} className="btn btn-primary btn-logout">
          View User Profile
        </Link>
        <h1 className="mb-4">{recipe.name}</h1>
        <hr />
        <h3>{recipe.description}</h3>

        <h3 className="mt-4">Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>

        <h3 className="mt-4">Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction.trim()}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
