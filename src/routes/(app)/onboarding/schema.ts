import { z } from 'zod';

export const schemaStep1 = z.object({
	name: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.max(26)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	website: z.string().url('The website must be a valid URL.').optional().nullable()
});

export const schemaStep2 = schemaStep1.extend({
	invites: z.array(z.string().email('The email must be a valid email address.'))
});
