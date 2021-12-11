import * as qs from "qs";
import { PathLike } from "fs";

export const apiConfig = {
    returnRejectedPromiseOnError: true,
    withCredentials: false,
    timeout: 30000,
    baseURL: "http://localhost:5000/",
    headers: {
        common: {
            "Cache-Control": "no-cache, no-store",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
    paramsSerializer: (params: PathLike) =>
        qs.stringify(params, { indices: false }),
};
