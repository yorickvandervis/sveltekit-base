import { auth } from '$lib/server/auth';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { PageServerLoad } from './$types';

import { schemaStep2 as lastStep } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(lastStep))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(lastStep));

		if (!form.valid) return fail(400, { form });

		try {
			const organization = await auth.api.createOrganization({
				body: {
					name: form.data.name,
					slug: form.data.slug
				},
				headers: request.headers
			});
			if (!organization) {
				return fail(500, { error: 'Failed to create organization.', form });
			}

			redirect(303, `/${organization.id}`);
		} catch (error) {
			if (isRedirect(error)) throw error;
			return fail(500, { error: 'Failed to create organization.', form });
		}
	}
};
