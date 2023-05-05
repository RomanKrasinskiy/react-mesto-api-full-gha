import { apiConfig } from "./constants";

class Auth {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      credentials: 'include',
    })
    .then(this._chechResponse);
  }
  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      credentials: 'include',
    })
    .then(this._chechResponse);
  }
  logout () {
    return fetch(`${this._url}/logout`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
  }
  
  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then(this._chechResponse);
  }

  _chechResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const auth = new Auth(apiConfig);
