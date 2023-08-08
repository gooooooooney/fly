import { createClient } from 'pexels';

export const client = createClient(process.env.PEXELS_API_KEY as string);

