import axios from 'axios';
import { realizaRefresh } from './helpers/refreshToken';
import { applyErrorHandler } from './interceptors/applyErrorHandler';
import { criaLogDev } from './interceptors/criaLogDev';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', baseURL);

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

applyErrorHandler(Api);

setInterval(() => realizaRefresh(), 10 * 60 * 1000);

criaLogDev(Api, 'ApiGeral');

export default Api;
