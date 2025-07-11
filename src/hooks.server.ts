import type { Handle } from '@sveltejs/kit';

import { paraglideMiddleware } from '$lib/paraglide/server';
import { auth } from '$lib/server/auth'; // path to your auth file
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

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

export const handle = sequence(handleAuth, handleParaglide);
