export interface GisPhConfig {
    /**
     * API Key for server-side or authorized access.
     */
    apiKey?: string;

    /**
     * Supabase access token for client-side user context.
     */
    accessToken?: string;

    /**
     * Base URL for the API. Defaults to https://api.gis.ph/v1
     */
    baseUrl?: string;
}

export interface RequestOptions extends RequestInit {
    query?: Record<string, string | number | undefined | null>;
}

export interface ApiResponse<T> {
    data: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    error: null | {
        message: string;
        code?: string;
        issues?: any[]; // For Zod validation errors
    };
}
