export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mockmind_token');
  }
  return null;
};

export const setToken = (t: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockmind_token', t);
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockmind_token');
  }
};

export const isLoggedIn = () => !!getToken();
