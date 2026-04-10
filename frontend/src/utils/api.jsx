class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async addNewCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._getHeaders(),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async updateUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async updateUserAvatar(data) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api(import.meta.env.VITE_API_URL);
export default api;