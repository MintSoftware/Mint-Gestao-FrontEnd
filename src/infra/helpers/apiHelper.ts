import { Auth } from "@/types/Auth";
import Api from "../api";

class Helper {
    setAuthorization(auth: Auth) {
        Api.defaults.headers['token'] = `Bearer ${auth.token}`
        Api.defaults.headers['RefreshToken'] = auth.refreshToken;
    }

    clearAuthorization() {
        delete Api.defaults.headers['token'];
        delete Api.defaults.headers['RefreshToken'];
    }
}

export const ApiHelper = new Helper();