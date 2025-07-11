import { polarClient } from '@polar-sh/better-auth';
import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';
export const authClient = createAuthClient({
	plugins: [polarClient(), organizationClient()]
});
