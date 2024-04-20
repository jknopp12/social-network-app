import axios from "axios";
const api = axios.create({
  withCredentials: true
}
);

export const API_BASE = process.env.REACT_APP_BASE_API_URL;
export const RECIPES_API = `${API_BASE}/api/recipes`;
export interface Recipe {
    _id: string; name: string; description: string; user: string;
    instructions: string, ingredients: string
  };

export const findAllRecipes = async () => {
    const response = await api.get(`${RECIPES_API}`);
    return response.data;
};

export const getRecipeById = async (recipeId: string) => {
    const response = await api.get(`${RECIPES_API}/${recipeId}`);
    return response.data;
};

