import { environment } from "src/environments/environment";

const base = 'http://localhost:8000'

export const appShellEndpoints = {
    getPostSearchFeature: (type: string) => `${base}/${type}`,
    putDeleteFeature: (type: string, id: any) => `${base}/${type}/${id}`
};