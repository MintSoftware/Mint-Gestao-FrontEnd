import axios from 'axios';
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

criaLogDev(Api, 'ApiGeral');

export default Api;
