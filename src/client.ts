import { Fetcher } from './core/fetcher.js';
import type { GisPhConfig } from './core/types.js';
import { Barangays } from './resources/barangays.js';
import { Provinces } from './resources/provinces.js';

export class GisPh {
    public barangays: Barangays;
    public provinces: Provinces;
    private fetcher: Fetcher;

    constructor(config: GisPhConfig = {}) {
        this.fetcher = new Fetcher(config);
        this.barangays = new Barangays(this.fetcher);
        this.provinces = new Provinces(this.fetcher);
    }
}

export default GisPh;
export * from './core/types.js';
export * from './core/errors.js';
