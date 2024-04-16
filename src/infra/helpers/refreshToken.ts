import Api from "../api";
import { ApiHelper } from "./apiHelper";

export const realizaRefresh = async () => {
    const refreshToken = localStorage.getItem('@refreshToken');

    if (refreshToken) {
        try {
            ApiHelper.clearAuthorization();
            const { data } = await Api.post('auth/refresh', { refreshToken });

            if (data) {
                localStorage.setItem('@token', data);
                ApiHelper.setAuthorization({ token: data, refreshToken: refreshToken });
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