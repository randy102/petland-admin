import jwt from "jsonwebtoken"

export enum UserRole {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

export interface UserPayload {
  email: string
  role: UserRole
  _id: string
}

export function isLogin() {
  const token = getToken();
  return !!token;
}

export function hasAdminPermission(role: string){
  return role && ["ADMIN", "MOD"].includes(role);
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
