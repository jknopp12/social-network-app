import axios from "axios";
const api = axios.create({
  withCredentials: true
}
);

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const RECIPES_API = `${API_BASE}/api/recipes`;
export interface Recipe {
    _id: string; name: string; description: string; user: string;
    instruction: string, ingredients: string
  };

export const getRecipes = async () => {
    const response = await api.get("/recipes");
    return response.data;
};

export const getRecipeById = async (recipeId: string) => {
    const response = await api.get(`/recipes/${recipeId}`);
    return response.data;
};


