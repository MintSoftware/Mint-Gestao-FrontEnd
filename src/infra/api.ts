import axios from 'axios';
import { realizaRefresh } from './helpers/refreshToken';
import { applyErrorHandler } from './interceptors/applyErrorHandler';
import { criaLogDev } from './interceptors/criaLogDev';

const Api = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'https://mintgestao-api.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

applyErrorHandler(Api);

setInterval(() => realizaRefresh(), 1 * 60 * 1000);

criaLogDev(Api, 'ApiGeral');

export default Api;



