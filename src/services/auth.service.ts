import api from './api.config';
import { jwtDecode } from "jwt-decode";
import { User } from '../types/user';


export type AuthStatusType = 'logged-in' | 'logged-out';

export const authStatus =():AuthStatusType => {
  return isLoggedIn() ? 'logged-in' : 'logged-out';
}

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
        localStorage.setItem("secureAccessExpiresAt", '0');
      }
      return response
    });
}

export const submit2Fa = (code: string) => {
  return api
    .post('secure_auths',
      { code }
    ).then((response) => {
      if (response.data.data.user) {
        const user = {...jwtDecode(response.data.data.user), token: response.data.data.user};
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        localStorage.setItem("secureAccessExpiresAt", '0');
      }
      return response
    });
}

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("secureAccessExpiresAt");
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