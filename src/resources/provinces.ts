import { BaseResource } from '../core/base.js';
import type { ApiResponse } from '../core/types.js';

export interface Province {
    id: string;
    name: string;
    [key: string]: any;
}

export interface ProvinceListParams {
    page?: number;
    limit?: number;
}

export class Provinces extends BaseResource {

    public async list(params: ProvinceListParams = {}): Promise<ApiResponse<Province[]>> {
        return this.fetcher.request<ApiResponse<Province[]>>('/provinces', {
            query: params as any,
        });
    }

    public async get(id: string): Promise<ApiResponse<Province>> {
        return this.fetcher.request<ApiResponse<Province>>(`/provinces/${id}`);
    }
}
