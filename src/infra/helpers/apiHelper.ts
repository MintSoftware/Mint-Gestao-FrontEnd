import { Auth } from "@/types/Auth";
import Api from "../api";

class Helper {
    setAuthorization(auth: Auth) {
        Api.defaults.headers['token'] = `Bearer ${auth.token}`
    }

    clearAuthorization() {
        delete Api.defaults.headers['token'];
    }
}

export const ApiHelper = new Helper();