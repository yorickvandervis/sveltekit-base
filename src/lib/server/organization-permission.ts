import { auth } from './auth';

export const checkOrganizationPermission = async (
	orgId: string,
	headers: Headers
): Promise<boolean> => {
	const orgs = await auth.api.listOrganizations({ headers });
	return orgs.some((org) => org.id === orgId);
};
