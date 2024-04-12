import { User } from "@/types/User";
import { Axios } from "axios";
import Api from "../api";

export function applyErrorHandler(axios: Axios) {
    axios.interceptors.response.use(
        (response) => {
            if (response.data && response.data.success === false) {
                return Promise.reject(new Error(response.data.message));
            }
            return response;
        }, async (error) => {
            debugger;
            if (error.response.status === 403) {
                // get user from localstorage
                const userLogged = localStorage.getItem('@userLogged'),
                    userLoggedParsed: User = JSON.parse(userLogged == null || userLogged == 'undefined' ? '{}' : userLogged);
                // validate refreshtoken
                if (userLoggedParsed?.refreshToken) {
                    const { data } = await Api.post('auth/refresh', { refreshToken: userLoggedParsed.refreshToken });

                    // update token
                    if (data.token) {
                        userLoggedParsed.token = data.token;

                        Api.defaults.headers.Authorization = `Bearer ${data.content.token}`;

                        localStorage.setItem('@userLogged', JSON.stringify(userLoggedParsed));
                    }
                } else {
                    await localStorage.setItem('@userLogged', JSON.stringify({}));
                    window.location.href = '/';
                }
            }
        }
    );
}