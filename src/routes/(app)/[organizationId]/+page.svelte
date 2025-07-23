<script lang="ts">
	import { PUBLIC_TEST_PRODUCT_ID } from '$env/static/public';
	import { authClient } from '$lib/auth-client';

	async function checkout() {
		await authClient.checkout({
			// Any Polar Product ID can be passed here
			products: [PUBLIC_TEST_PRODUCT_ID],
			// Or, if you setup "products" in the Checkout Config, you can pass the slug
			slug: 'pro'
		});
	}

	async function fetchCustomerState() {
		const { data: customerState } = await authClient.customer.state();
		console.log(customerState);
	}

	async function gotoPortal() {
		await authClient.customer.portal();
	}
</script>

<button onclick={checkout}>Checkout</button>
<button onclick={fetchCustomerState}>Fetch state</button>
<button onclick={gotoPortal}>Go to Portal</button>
