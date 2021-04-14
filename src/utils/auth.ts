import jwt from 'jsonwebtoken';

export enum UserRole {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

export interface UserPayload {
  email: string;
  role: UserRole;
  _id: string;
}

export function isLogin() {
  const token = getToken();
  return !!token;
}

export function hasAdminPermission(role: string) {
  return role && ['ADMIN', 'MOD'].includes(role);
}

export function logOut() {
  const token = window.localStorage.getItem('token') as string;

  const decoded = jwt.decode(token) as any;
  if (decoded){
    Object.keys(decoded).forEach(key => {
      window.localStorage.removeItem(`user.${key}`);
    });
  }

  window.localStorage.removeItem('token');
}

export function logIn(token: string) {
  window.localStorage.setItem('token', token);

  const decoded = jwt.decode(token) as any;

  Object.keys(decoded).forEach(key => {
    window.localStorage.setItem(`user.${key}`, decoded[key]);
  });
}

export function getToken() {
  return window.localStorage.getItem('token');
}

export function getUser(field: keyof UserPayload): string | undefined {
  const token = getToken();
  if (field && !!token) {
    const payload: any = jwt.decode(token);
    return payload ? payload[field] : undefined;
  }
  return undefined;
}
