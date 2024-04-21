import axios from "axios";
const api = axios.create({
  withCredentials: true
}
);
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
// export const USERS_API = process.env.REACT_APP_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const RECIPES_API = `${BASE_API}/api/recipes`;
export interface User {
  _id: string; username: string; password: string; role: string; email: string;
  firstName: string, lastName: string
};
export interface Recipe {
  _id: string;
  name: string;
  description: string;
  user: string;
  ingredients: string[];
  instructions: string[];
};

export const signin = async (credentials: User) => {
  const response = await api.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
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

export const updateUser = async (user: any) => {
  const response = await api.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await api.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user: any) => {
  const response = await api.post(`${USERS_API}`, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await api.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await api.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await api.post(`${USERS_API}/signout`);
  return response.data;
};
export const findUserById = async (id: string) => {
  const response = await api.get(`${USERS_API}/${id}`);
  return response.data;
};
export const findRecipeByUser = async (user: User) => {
  const response = await api.get(`${USERS_API}/${user._id}/recipes`)
  return response.data;
}
export const createRecipe = async (recipe: any) => {
  const response = await api.post(`${RECIPES_API}`, recipe)
  return response.data;
}
export const getUserRole = async (userId: string) => {
  const response = await api.get(`${USERS_API}/${userId}/role`);
  return response.data;
};