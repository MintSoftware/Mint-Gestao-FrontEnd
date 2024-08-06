import { Axios } from "axios";

export function criaLogDev(axios: Axios, tag: string) {
    axios.interceptors.request.use(
        reqConfig => {
            console.log(tag, 'Starting Request', reqConfig, new Date().toISOString());
            return reqConfig;
        },
        error => {
            console.log(tag, 'Request Error', error, new Date().toISOString());
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        reqConfig => {
            console.log(tag, 'Response:', reqConfig, new Date().toISOString());
            return reqConfig;
        },
        error => {
            console.log(tag, 'Response Error', error, new Date().toISOString());

            if (error.response && error.response.data) {
                console.log(tag, 'Response Error', error.response.data, new Date().toISOString());
            }

            return Promise.reject(error);
        }
    );


}
