export const AUTH_TOKEN_KEY = 'TOPFIT'
export const AUTH_USER_KEY = 'TOPFIT_CURRENT_USER'

export const checkAuth = () => {
  return localStorage && localStorage.getItem(AUTH_TOKEN_KEY);
}

export const setAuth = (token) => {
  localStorage && localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const logout = () => {
  localStorage && localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage && localStorage.removeItem(AUTH_USER_KEY);
}

export const setUser = (obj) => {
  localStorage && localStorage.setItem(AUTH_USER_KEY, JSON.stringify(obj));
}

export const getUser = () => {
  return JSON.parse(localStorage && localStorage.getItem(AUTH_USER_KEY));
}