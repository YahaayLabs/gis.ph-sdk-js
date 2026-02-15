export class GisPhError extends Error {
    public status: number;
    public code?: string | undefined;
    public issues?: any[] | undefined;

    constructor(message: string, status: number, code?: string, issues?: any[]) {
        super(message);
        this.name = 'GisPhError';
        this.status = status;
        this.code = code;
        this.issues = issues;
    }
}
