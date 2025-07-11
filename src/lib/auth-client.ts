import { BETTER_AUTH_URL } from '$env/static/private';
import { polarClient } from '@polar-sh/better-auth';
import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';
export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: BETTER_AUTH_URL,
	plugins: [polarClient(), organizationClient()]
});
