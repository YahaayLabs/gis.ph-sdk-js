import { Fetcher } from './fetcher.js';

export class BaseResource {
    protected fetcher: Fetcher;

    constructor(fetcher: Fetcher) {
        this.fetcher = fetcher;
    }
}
