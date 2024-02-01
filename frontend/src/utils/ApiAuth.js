class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) return res.json();
    if(res.status === 400 || res.status === 401) return res.status;
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signUp(data) {
    //console.log(data);
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res))
  }

  signIn(data) {
    //console.log(data);
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res))
  }

  checkToken(data) {
    //console.log(data);
    const token = JSON.parse(data).token
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res))
  }
}

const auth = new Auth({
  // baseUrl: 'https://auth.nomoreparties.co',
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'http://api.razumtsev.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;