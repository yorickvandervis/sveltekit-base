import { auth } from '$lib/server/auth';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const userState = await auth.api.state({
		headers: request.headers
	});

	return {
		userState
	};
};
