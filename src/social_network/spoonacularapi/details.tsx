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

    const apiKey = '5b932759591e406d84e164ce05aa8c8d';

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
                        <h1 className="mb-4">Recipe Info</h1>
                        <hr />
                        <h2>{recipeDetails.title}</h2>
                        <p> <a href={recipeDetails.sourceUrl}>View the Full Recipe Here!</a></p>
                        <h3 className="mt-4">Instructions</h3>
                        <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}></div>
                        <br/>
                        <img src={recipeDetails.image} alt={recipeDetails.title} />
                    </div>
                </div>
            ) : (
                <div className="d-flex">
                    <Navigation />
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
