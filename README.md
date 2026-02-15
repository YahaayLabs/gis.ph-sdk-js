# GIS.PH JavaScript/TypeScript SDK

The **`gis.ph-sdk`** package provides a robust, type-safe client for interacting with the `api.gis.ph` service. It simplifies integration by handling authentication, request signing, and error parsing, allowing developers to focus on building features.

## Installation

Install the package via your preferred package manager:

```bash
npm install gis.ph-sdk
# or
yarn add gis.ph-sdk
# or
pnpm add gis.ph-sdk
```

## Getting Started

Initialize the client with your API key or access token.

```typescript
import { GisPh } from 'gis.ph-sdk';

const client = new GisPh({
  apiKey: 'YOUR_API_KEY',
  // accessToken: 'YOUR_SUPABASE_ACCESS_TOKEN', // Optional: for user-specific context
});
```

## Resources

The SDK organizes API endpoints into logical resources.

### Provinces

Interact with Philippine provinces data.

#### List Provinces
Retrieve a paginated list of provinces.

```typescript
const response = await client.provinces.list({
  page: 1,
  limit: 10
});

console.log(response.data); // Array of Province objects
```

#### Get Province
Retrieve details for a specific province by ID.

```typescript
const { data: province } = await client.provinces.get('PROVINCE_ID');
```

### Barangays

Interact with barangay data, including search functionality.

#### List Barangays
Filter barangays by province (required) and optionally by municipality or name.

```typescript
const response = await client.barangays.list({
  province: 'Bohol',       // Required: Exact match
  municipality: 'Tubigon', // Optional: Starts-with search
  limit: 20
});
```

#### Search Barangays
Perform a global text search for barangays across all provinces.

```typescript
const response = await client.barangays.search({
  q: 'Poblacion',
  limit: 5
});
```

#### Get Barangay
Retrieve details for a specific barangay by ID.

```typescript
const { data: barangay } = await client.barangays.get('BARANGAY_ID');
```

## Authentication

The SDK supports two authentication methods:

1.  **API Key (`apiKey`)**: Best for server-side integrations or public client-side access where allowed. Sets the `X-API-Key` header.
2.  **Access Token (`accessToken`)**: Used for authenticated user sessions (e.g., Supabase JWTs). Sets the `Authorization: Bearer <token>` header.

You can provide one or both in the constructor configuration.

## Error Handling

API errors are thrown as `GisPhError` instances, containing status codes and detailed error messages.

```typescript
import { GisPh, GisPhError } from 'gis.ph-sdk';

try {
  await client.barangays.list({ province: '' }); // Missing required param
} catch (error) {
  if (error instanceof GisPhError) {
    console.error(`API Error ${error.status}: ${error.code} - ${error.message}`);
    // Example: API Error 400: VALIDATION_ERROR - Invalid province
  } else {
    console.error('Network or unexpected error:', error);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and ships with type definitions. Key interfaces like `Province`, `Barangay`, and `ApiResponse` are exported for use in your application.

```typescript
import type { Province, Barangay } from 'gis.ph-sdk';
```
