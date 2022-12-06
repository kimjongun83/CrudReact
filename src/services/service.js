import { BASE_URL } from "../constants/constants.js";
import { objectToQueryString, handleErrors } from "../utils/function.js";
const STORAGE_ACCESS_TOKEN = `token`;
const setLocalStorage = (name, value) => localStorage.setItem(name, value);
export default {
  token: undefined,
  headers: {},
  storeAccessToken(accessToken) {
    setLocalStorage(STORAGE_ACCESS_TOKEN, accessToken);
  },
  setJwtToken(token) {
    this.token = token;
    this.establishHeaderRequest();
  },
  establishHeaderRequest() {
    this.headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  },
  get({ path = "", params, json = true }) {
    return fetch(`${BASE_URL}/${path}?${objectToQueryString(params)}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then(handleErrors)
      .then((response) => {
        return json ? response.json() : response.text();
      })
      .catch(async (err) => {
        throw await err.json();
      });
  },
  post({ path = "", payload, json = true }) {
    return fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      referrer: "no-referrer",
      body: payload,
      
    })
      .then(handleErrors)
      .then((response) => {
        return json ? response.json() : response.text();
      })
      .catch(async (err) => {
        console.log(err);
        throw await err.json();
      });
  },
};
