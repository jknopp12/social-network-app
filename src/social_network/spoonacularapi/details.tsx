import Navigation from "../navigation";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SpoonacularDetails() {
    const { recipeId } = useParams();
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
    interface RecipeDetails {
        title: string;
        image: string;
        summary: string;
    }

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=cf8354d5713e462aa873fd607f939bff`);
                setRecipeDetails(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    return (
        <div>
            {recipeDetails ? (
                <div>
                    <h2>{recipeDetails.title}</h2>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                    <p>{recipeDetails.summary}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
