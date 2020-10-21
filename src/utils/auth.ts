import jwt from "jsonwebtoken"

interface UserPayload {
  username: string
  roleName: 'Admin' | 'SubUser'
  _id: string
}

export function isLogin() {
  const token = getToken();
  const secret = process.env.REACT_APP_JWT_SECRET
  if (!!token && !!secret) {
    try {
      jwt.verify(token, secret);
      return true
    }
    catch (err) {
      return false;
    }
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
    console.log({payload})
    return payload ? payload[field] : undefined;
  }
  return undefined
}
