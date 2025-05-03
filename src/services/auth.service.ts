import api from './api.config';
import { jwtDecode } from "jwt-decode";
import { User } from '@src/types/user';
import { ACTIVE_DEBUGGING } from '@src/constants';


export type AuthStatusType = 'logged-in' | 'logged-out';

export const authStatus =():AuthStatusType => {
  return isLoggedIn() ? 'logged-in' : 'logged-out';
}

export const isLoggedIn = ():boolean => {
  const user  = getCurrentUser();
  const token = localStorage.getItem("token");
  return user && token ? true : false;
}

export const saveUser = (userData:any):User  => {
  const user = {...jwtDecode(userData), token: userData} as User;
  console.log(user);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", user.token);
  localStorage.setItem("secureAccessExpiresAt", user.secure_expires_at.toString());
  return user;
} 

export const login = (email: string, password: string) => {
  return api
    .post('sessions',
      { email, password }
    ).then((response) => {
      if (response.data.data.user) {
        saveUser(response.data.data.user);
      }
      return response
    });
}

export const submit2Fa = (otpCode: string) => {
  return api
    .post('secure_auth',
      { otpCode }
    ).then((response) => {
      if (response.data.data.user) {
        saveUser(response.data.data.user);
      }
      ACTIVE_DEBUGGING && console.log('has secure access', hasSecureAccess());
      return response
    });
}

export const revokeAccess = () => {
  // remove local access even if the server fails
  localStorage.removeItem("secureAccessExpiresAt");
  return api
    .delete('secure_auth')
      .then((response) => {
        if (response.data.data.user) {
          saveUser(response.data.data.user);
        }
        ACTIVE_DEBUGGING && console.log('has secure access', hasSecureAccess());
        return response
      });
}

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("secureAccessExpiresAt");
  localStorage.removeItem("secured");
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

export const getSecured = ():boolean => {
  if (!hasSecureAccess()) return false;

  const secured:string | null = localStorage.getItem("secured");
  return secured === 'true';
}

export const setSecured = (value:boolean):boolean => {
  if (!hasSecureAccess()) return false;

  localStorage.setItem("secured", value.toString());
  return value;
}

export const invertSecured = ():boolean => {
  if (!hasSecureAccess()) return false;

  const secured: boolean = getSecured();

  localStorage.setItem("secured", (!secured).toString());
  return !secured;
}

export const hasSecureAccess = () => {
  const secureAccessExpiresAt:string | null = localStorage.getItem("secureAccessExpiresAt");
  return secureAccessExpiresAt && Number(secureAccessExpiresAt) > Date.now();
}

export const getSecureAccessExpiresAt = ():Number => {
  const secureAccessExpiresAt:string | null = localStorage.getItem("secureAccessExpiresAt");
  return secureAccessExpiresAt ? Number(secureAccessExpiresAt) : 0;
}