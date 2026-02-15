import { BaseResource } from '../core/base.js';
import type { ApiResponse } from '../core/types.js';

export interface Barangay {
    id: string;
    name: string;
    // properties: any; // GeoJSON properties
    [key: string]: any;
}

export interface BarangayListParams {
    province: string;
    municipality?: string;
    name?: string;
    page?: number;
    limit?: number;
}

export interface BarangaySearchParams {
    q: string;
    limit?: number;
}

export class Barangays extends BaseResource {

    public async list(params: BarangayListParams): Promise<ApiResponse<Barangay[]>> {
        return this.fetcher.request<ApiResponse<Barangay[]>>('/barangays', {
            query: params as any,
        });
    }

    public async get(id: string): Promise<ApiResponse<Barangay>> {
        return this.fetcher.request<ApiResponse<Barangay>>(`/barangays/${id}`);
    }

    public async search(params: BarangaySearchParams): Promise<ApiResponse<Barangay[]>> {
        return this.fetcher.request<ApiResponse<Barangay[]>>('/barangays/search', {
            query: params as any,
        });
    }
}
