import { Axios } from "axios";

export function applyErrorHandler(axios: Axios) {
    axios.interceptors.response.use(
        (response) => {
            if (response.data && response.data.success === false) {
                return Promise.reject(new Error(response.data.message));
            }
            return response;

        }
    );
}