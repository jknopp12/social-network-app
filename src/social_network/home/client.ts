import axios from "axios";
const api = axios.create({
    withCredentials: true
}
);

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPES_API = `${BASE_API}/api/recipes`;
export interface Recipe {
    _id: string; name: string; description: string; user: string;
    instructions: string, ingredients: string;
};

export const findAllRecipes = async () => {
    const response = await api.get("/api/recipes");
    return response.data;
};

export const getRecipeById = async (recipeId: string) => {
    const response = await api.get(`/api/recipes/${recipeId}`);
    return response.data;
};

