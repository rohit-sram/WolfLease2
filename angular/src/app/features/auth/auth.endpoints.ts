import { environment } from "src/environments/environment";

let base = environment.apiUrl;

export const authEndPoints = {
    login:  `${base}/login/`,
    register: `${base}/register/`
};