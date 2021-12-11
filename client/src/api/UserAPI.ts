import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Token } from "../common/models/Token";
import { apiConfig } from "./api.config";

import Api from "./Api";

export class UserApi extends Api {
    public constructor(config?: AxiosRequestConfig) {
        super(config);
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param,
        }));

        this.api.interceptors.response.use((param: AxiosResponse) => ({
            ...param,
        }));

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.promote = this.promote.bind(this);
    }

    public login(email: string, password: string): Promise<Token> {
        return this.post<Token, { email: string; password: string }>(
            "api/accounts/login",
            { email: email, password: password }
        ).then((resp) => {
            return resp.data;
        });
    }

    public signup(
        username: string,
        email: string,
        password: string
    ): Promise<string> {
        return this.post<
            string,
            {
                username: string;
                email: string;
                password: string;
            }
        >("api/accounts/signup", {
            username: username,
            email: email,
            password: password,
        }).then((resp) => {
            return resp.data;
        });
    }

    public promote(email: string): Promise<string> {
        return this.post<
            string,
            {
                email: string;
            }
        >("api/accounts/promote", {
            email: email,
        }).then((resp) => {
            return resp.data;
        });
    }
}

export const userApi = new UserApi(apiConfig);
