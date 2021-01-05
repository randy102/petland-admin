import jwt from "jsonwebtoken"

export enum UserRole {
  Admin = "Admin",
  SubUser = "SubUser",
  HR = "HR"
}

export interface UserPayload {
  username: string
  roleName: keyof UserRole
  _id: string
}

export function isLogin() {
  const token = getToken();
  if (!!token) {
    return true
  }
  return false;
}

export function logOut() {
  window.localStorage.removeItem("token");
}

export function logIn(token: string) {
  window.localStorage.setItem("token", token);
}

export function getToken() {
  return window.localStorage.getItem("token");
}

export function getUser(field: keyof UserPayload): string | undefined {
  const token = getToken()
  if (field && !!token) {
    const payload: any = jwt.decode(token)
    return payload ? payload[field] : undefined;
  }
  return undefined
}
