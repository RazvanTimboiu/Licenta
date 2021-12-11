import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiConfig } from "./api.config";

import Api from "./Api";
import { Proposal } from "../common/models/Proposal";

export class DataApi extends Api {
    public constructor(config?: AxiosRequestConfig) {
        super(config);
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param,
        }));

        this.api.interceptors.response.use((param: AxiosResponse) => ({
            ...param,
        }));

        this.getNext = this.getNext.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    public getNext(): Promise<Proposal> {
        return this.get<Proposal>(`api/data/get_next`).then((resp) => {
            return resp.data;
        });
    }

    public evaluate(isApproved: boolean, source: string): Promise<string> {
        return this.post<
            string,
            {
                is_approved: boolean;
                source: string;
            }
        >("api/data/evaluate", {
            is_approved: isApproved,
            source: source,
        }).then((resp) => {
            return resp.data;
        });
    }

    public propose(
        headline: string,
        content: string,
        source: string,
        label: string,
        motivation: string
    ): Promise<string> {
        return this.post<
            string,
            {
                headline: string;
                content: string;
                source: string;
                label: string;
                motivation: string;
            }
        >("api/data/add", {
            headline: headline,
            content: content,
            source: source,
            label: label,
            motivation: motivation,
        }).then((resp) => {
            return resp.data;
        });
    }
}

export const dataApi = new DataApi(apiConfig);
