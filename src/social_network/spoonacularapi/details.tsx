import Navigation from "../navigation";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SpoonacularDetails() {
    const pathname = window.location.href;
    const recipeId = pathname.split("/").pop();
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
    interface RecipeDetails {
        title: string;
        image: string;
        imageType: string;
        summary: string;
        sourceUrl: string;
        instructions: string;
    }

    const apiKey = 'cf8354d5713e462aa873fd607f939bff';

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
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
                <div className="d-flex">
                    <Navigation />
                    <div className="content-container">
                        <Link to="/Spoonacular" className="btn btn-primary btn-logout">
                            Click here to search Spoonacular for more recipes!
                        </Link>
                        <h1 className="mb-4">{recipeDetails.title}</h1>
                        <hr />
                        <img src={recipeDetails.image} alt={recipeDetails.title} />
                        <h4>View the full recipe <a href={recipeDetails.sourceUrl}>here</a> </h4>
                        <h3 className="mt-4">Ingredients</h3>
                        {recipeDetails.instructions}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
