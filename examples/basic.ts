import { GisPh } from '../src/client.js';

async function main() {
    const client = new GisPh({
        // apiKey: 'YOUR_API_KEY', // Optional for public endpoints
    });

    try {
        console.log('Fetching provinces...');
        const provinces = await client.provinces.list({ limit: 5 });
        console.log('Provinces:', provinces);

        console.log('\nFetching barangays in Bohol...');
        const barangays = await client.barangays.list({
            province: 'Bohol',
            limit: 5,
        });
        console.log('Barangays:', barangays);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
