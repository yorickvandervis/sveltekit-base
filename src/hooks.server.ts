import type { Handle } from '@sveltejs/kit';

import { paraglideMiddleware } from '$lib/paraglide/server';
import { auth } from '$lib/server/auth'; // path to your auth file
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handleLocals: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;
	return resolve(event);
};

const handleAuth: Handle = ({ event, resolve }) => {
	return svelteKitHandler({ auth, event, resolve });
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ locale, request }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle = sequence(handleLocals, handleAuth, handleParaglide);
