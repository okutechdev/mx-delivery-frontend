import axios from 'axios'
import Cookies from 'js-cookie'

const TOKEN_KEY = '@mxtoken'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333'
});

export { api };