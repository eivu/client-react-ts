import api from './api';
import { jwtDecode } from "jwt-decode";
import { User } from '../types/user';

export const login = (email: string, password: string) => {
  let user: User;
  return api
    .post('sessions',
      { email, password }
    ).then((response) => {
      if (response.data.data.user) {
        user = {...jwtDecode(response.data.data.user), token: response.data.data.user};
        localStorage.setItem("user", JSON.stringify(user));
      }
      return response
    });
}

export const getCurrentUser = () => {
  const userStr: string | null = localStorage.getItem('user');

  try {
    if (userStr) return JSON.parse(userStr);
  } catch (error) {
    return null;
  }

  return null;
}