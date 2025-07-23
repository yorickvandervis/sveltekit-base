import { z } from 'zod/v4';

export const schema = z.object({
	header: z.string(),
	id: z.number(),
	limit: z.string(),
	reviewer: z.string(),
	status: z.string(),
	target: z.string(),
	type: z.string()
});

export type Schema = z.infer<typeof schema>;
