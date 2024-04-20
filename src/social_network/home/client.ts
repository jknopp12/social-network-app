import axios from "axios";
const api = axios.create({
  withCredentials: true
}
);

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPES_API = `${BASE_API}/api/recipes`;
export const USERS_API = `${BASE_API}/api/users`;

export interface Recipe {
    _id: string; name: string; description: string; user: string;
    instructions: string, ingredients: string
  };
  export interface User {
    _id: string; username: string; password: string; role: string;
    firstName: string, lastName: string
  };

export const findAllRecipes = async () => {
    const response = await api.get(`${RECIPES_API}`);
    return response.data;
};
export const getRecipeById = async (recipeId: string) => {
    const response = await api.get(`${RECIPES_API}/${recipeId}`);
    return response.data;
};
export const findRecipeByUser = async (user: User) => {
  const response = await api.get(`${USERS_API}/${user._id}/recipes`)
  return response.data;
}
export const profile = async () => {
  try {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized');
    } else {
      throw error;
    }
  }
};

