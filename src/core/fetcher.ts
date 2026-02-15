import type { GisPhConfig, RequestOptions, ApiResponse } from './types.js';
import { GisPhError } from './errors.js';

export class Fetcher {
    private config: GisPhConfig;

    constructor(config: GisPhConfig) {
        this.config = {
            baseUrl: 'https://api.gis.ph/v1',
            ...config,
        };
    }

    public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = new URL(`${this.config.baseUrl}${endpoint}`);

        if (options.query) {
            Object.entries(options.query).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.config.accessToken) {
            headers['Authorization'] = `Bearer ${this.config.accessToken}`;
        } else if (this.config.apiKey) {
            headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }

        if (this.config.apiKey) {
            headers['X-API-Key'] = this.config.apiKey;
        }

        try {
            const response = await fetch(url.toString(), {
                ...options,
                headers,
            });

            let data: any;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw new GisPhError(
                    data?.message || response.statusText,
                    response.status,
                    data?.error?.code,
                    data?.error?.issues
                );
            }

            return data as T;
        } catch (error) {
            if (error instanceof GisPhError) {
                throw error;
            }
            throw new GisPhError(
                error instanceof Error ? error.message : 'Unknown network error',
                0
            );
        }
    }
}
