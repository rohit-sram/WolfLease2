import { environment } from "src/environments/environment";

const base = environment.apiUrl;

export const appShellEndpoints = {
    getPostSearchFeature: (type: string) => `${base}/${type}`,
    putDeleteFeature: (type: string, id: any) => `${base}/${type}/${id}`
};