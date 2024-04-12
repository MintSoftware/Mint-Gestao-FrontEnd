import { Axios } from "axios";
import Api from "../api";
import { ApiHelper } from "../helpers/apiHelper";

export function applyErrorHandler(axios: Axios) {
    axios.interceptors.response.use(
        (response) => {
            if (response.data && response.data.success === false) {
                return Promise.reject(new Error(response.data.message));
            }
            return response;

        }, async (error) => {
            if (error.response.status === 403) {
                const originalRequest = error.config;

                const refreshToken = localStorage.getItem('@refreshToken');

                if (refreshToken) {
                    try {
                        ApiHelper.clearAuthorization();
                        const { data } = await Api.post('auth/refresh', { refreshToken });

                        if (data) {
                            localStorage.setItem('@token', data);
                            ApiHelper.setAuthorization({ token: data, refreshToken: refreshToken });

                            originalRequest.headers['token'] = `Bearer ${data}`;

                            axios.request(originalRequest);
                        }
                    } catch (error) {
                        localStorage.removeItem('@usuario');
                        localStorage.removeItem('@token');
                        localStorage.removeItem('@refreshToken');
                        ApiHelper.clearAuthorization();
                        window.location.href = '/';
                    }

                } else {
                    localStorage.removeItem('@usuario');
                    localStorage.removeItem('@token');
                    localStorage.removeItem('@refreshToken');
                    ApiHelper.clearAuthorization();
                    window.location.href = '/';
                }
            }
        }
    );
}