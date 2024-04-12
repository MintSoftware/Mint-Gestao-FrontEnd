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
                // get user from localstorage
                const refreshToken = localStorage.getItem('@refreshToken');

                // validate refreshtoken
                if (refreshToken) {
                    const { data } = await Api.post('auth/refresh', { refreshToken });

                    // update token
                    if (data.token) {
                        localStorage.setItem('@token', JSON.stringify(data.token));
                        ApiHelper.setAuthorization({ token: data.token, refreshToken: refreshToken });
                    }
                } else {
                    await localStorage.setItem('@usuario', JSON.stringify({}));
                    await localStorage.setItem('@token', JSON.stringify({}));
                    await localStorage.setItem('@refreshToken', JSON.stringify({}));
                    await ApiHelper.clearAuthorization();
                    window.location.href = '/';
                }
            }
        }
    );
}