import api from './api.config';
import { jwtDecode } from "jwt-decode";
import { User } from '../types/user';

export const isLoggedIn = ():boolean => {
  const user  = getCurrentUser();
  const token = localStorage.getItem("token");
  return user && token ? true : false;
}

export const login = (email: string, password: string) => {
  let user: User;
  return api
    .post('sessions',
      { email, password }
    ).then((response) => {
      if (response.data.data.user) {
        user = {...jwtDecode(response.data.data.user), token: response.data.data.user};
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
      }
      return response
    });
}

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export const getCurrentUser = () => {
  const userStr: string | null = localStorage.getItem("user");

  try {
    if (userStr) return JSON.parse(userStr);
  } catch (error) {
    return null;
  }

  return null;
}