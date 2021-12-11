import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

export default class Api {
    [x: string]: any;

    public constructor(config?: AxiosRequestConfig) {
        this.api = axios.create(config);
        this.api.interceptors.request.use(async (param: AxiosRequestConfig) => {
            const jwt = await this.getJwt();
            console.log(jwt);
            param.headers["x-access-token"] = jwt !== "" ? jwt : "";
            return param;
        });

        this.getUri = this.getUri.bind(this);
        this.request = this.request.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
    }

    private storagger = async () => {
        let _role = await Storage.get({ key: "JWT" });
        return _role.value;
    };

    private getJwt() {
        return this.storagger().then((res) => {
            return JSON.parse(res ? res : '{"res":""}');
        });
    }
    protected getUri(config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }
    protected request<T>(
        config: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.api.request(config);
    }

    protected get<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.api.get(url, config);
    }

    protected post<T, B>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.api.post(url, data, config);
    }

    protected put<T, B>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.api.put(url, data, config);
    }

    protected delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.api.delete(url, config);
    }
}
