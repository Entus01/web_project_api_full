export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export const signUp = async (email, password) => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return await (response.ok ? response.json() : Promise.reject(`Error: ${response.status}`));
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
    return await (response.ok ? response.json() : Promise.reject(`Error: ${response.status}`));
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
    return await (response.ok ? response.json() : Promise.reject(`Error: ${response.status}`));
};