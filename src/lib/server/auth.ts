import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	POLAR_ACCESS_TOKEN,
	POLAR_WEBHOOK_SECRET
} from '$env/static/private';
import { checkout, polar, portal, usage, webhooks } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';

const polarClient = new Polar({
	accessToken: POLAR_ACCESS_TOKEN,
	// Use 'sandbox' if you're using the Polar Sandbox environment
	// Remember that access tokens, products, etc. are completely separated between environments.
	// Access tokens obtained in Production are for instance not usable in the Sandbox environment.
	server: 'sandbox'
});

import { PUBLIC_TEST_PRODUCT_ID } from '$env/static/public';

import { db } from './db'; // your drizzle instance

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [
		organization(),
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					authenticatedUsersOnly: false,
					products: [
						{
							productId: PUBLIC_TEST_PRODUCT_ID, // ID of Product from Polar Dashboard
							slug: 'pro' // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
						}
					],
					successUrl: '/success?checkout_id={CHECKOUT_ID}'
				}),
				portal(),
				usage(),
				webhooks({
					secret: POLAR_WEBHOOK_SECRET
					// onCustomerStateChanged:  (payload) =>  Triggered when anything regarding a customer changes
					// onOrderPaid: // (payload) => Triggered when an order was paid (purchase, subscription renewal, etc.)
					// ...Over 25 granular webhook handlers...
					// onPayload: (payload) => // Catch-all for all events
				})
			]
		})
	],
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	}
});
