import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiConfig } from "./api.config";

import Api from "./Api";
import { Prediction } from "../common/models/Prediction";

export class ModelApi extends Api {
    public constructor(config?: AxiosRequestConfig) {
        super(config);
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param,
        }));

        this.api.interceptors.response.use((param: AxiosResponse) => ({
            ...param,
        }));

        this.predict = this.predict.bind(this);
    }

    public predict(article: string): Promise<Prediction> {
        return this.post<
            Prediction,
            { content: string; headline_mode: boolean }
        >("api/model/predict", { content: article, headline_mode: false }).then(
            (resp) => {
                return resp.data;
            }
        );
    }
}

export const modelApi = new ModelApi(apiConfig);
