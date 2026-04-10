export const BASE_URL = import.meta.env.VITE_API_URL;

export const signUp = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

export const signIn = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

export const validateToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};