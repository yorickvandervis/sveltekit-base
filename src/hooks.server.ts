import { paraglideMiddleware } from '$lib/paraglide/server';
import { auth } from '$lib/server/auth'; // path to your auth file
import { checkOrganizationPermission } from '$lib/server/organization-permission';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handleOrganizationPermission: Handle = async ({ event, resolve }) => {
	const { organizationId } = event.params;
	const user = event.locals.user;

	if (organizationId) {
		if (!user) {
			throw redirect(302, '/login');
		}

		const orgs = await auth.api.listOrganizations({
			headers: event.request.headers
		});

		if (!orgs.length && !(event.url.pathname === '/')) {
			throw redirect(302, '/onboarding');
		}

		const hasPermission = await checkOrganizationPermission(organizationId, event.request.headers);
		if (!hasPermission) {
			throw redirect(302, `/${orgs[0].id}`);
		}
	}

	return resolve(event);
};

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

export const handle = sequence(
	handleLocals,
	handleAuth,
	handleOrganizationPermission,
	handleParaglide
);
