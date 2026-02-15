import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GisPh } from '../src/client.js';
import { GisPhError } from '../src/core/errors.js';

// Mock the global fetch function
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('GisPh SDK', () => {
    let client: GisPh;

    beforeEach(() => {
        fetchMock.mockReset();
        client = new GisPh({
            apiKey: 'test-api-key',
            accessToken: 'test-access-token',
        });
    });

    it('should send correct headers', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            headers: { get: () => 'application/json' },
            json: async () => ({ data: [] }),
        });

        await client.provinces.list();

        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining('/provinces'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer test-access-token',
                    'X-API-Key': 'test-api-key',
                }),
            })
        );
    });

    it('should handle query parameters', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            headers: { get: () => 'application/json' },
            json: async () => ({ data: [] }),
        });

        await client.barangays.list({ province: 'Bohol', limit: 10 });

        const url = new URL(fetchMock.mock.calls[0][0]);
        expect(url.searchParams.get('province')).toBe('Bohol');
        expect(url.searchParams.get('limit')).toBe('10');
    });

    it('should throw GisPhError on API error', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            headers: { get: () => 'application/json' },
            json: async () => ({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid province',
                },
            }),
        });

        await expect(client.barangays.list({ province: '' })).rejects.toThrow(GisPhError);

        try {
            await client.barangays.list({ province: '' });
        } catch (e: any) {
            expect(e).toBeInstanceOf(GisPhError);
            expect(e.status).toBe(400);
            expect(e.code).toBe('VALIDATION_ERROR');
        }
    });
});
