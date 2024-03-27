import axios from 'axios';
import { applyErrorHandler } from './interceptors/applyErrorHandler';
import { criaLogDev } from './interceptors/criaLogDev';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

applyErrorHandler(Api);

criaLogDev(Api, 'ApiGeral');

export default Api;



