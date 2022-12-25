import { BASE_URL } from 'constants/constant.js'
import { objectToQueryString, handleErrors } from 'utils/function.js'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    token: undefined,
    headers: {},
    storeAccessToken(token) {
        localStorage.setItem('token', token)
    },
    setJwtToken(token) {
        this.token = token
        this.establishHeaderRequest()
    },
    establishHeaderRequest() {
        this.headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
    },
    get({
        path = '',
        params,
        json = true
    }) {
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
            .then(response => {
                return json ? response.json() : response.text()
            })
            .catch(async err => { throw await err.json() })
    },
    post({
        path = '',
        payload,
        json = true
    }) {
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
            .then(response => {
                return json ? response.json() : response.text()
            })
            .catch(async err => {
                console.log(err)
                throw await err.json()
            })
    }
};