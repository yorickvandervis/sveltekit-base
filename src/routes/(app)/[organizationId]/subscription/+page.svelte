<script lang="ts">
	import { PUBLIC_TEST_PRODUCT_ID } from '$env/static/public';
	import { authClient } from '$lib/auth-client';
	import Button from '$lib/components/ui/button/button.svelte';
	import Check from '@lucide/svelte/icons/check';

	async function checkout() {
		await authClient.checkout({
			// Any Polar Product ID can be passed here
			products: [PUBLIC_TEST_PRODUCT_ID],
			// Or, if you setup "products" in the Checkout Config, you can pass the slug
			slug: 'pro'
		});
	}

	async function gotoPortal() {
		await authClient.customer.portal();
	}

	let pricingList = {
		free: ['Basic Analytics Dashboard', '5GB Cloud Storage', 'Email and Chat Support'],
		pro: [
			'Everything in Free Plan',
			'5GB Cloud Storage',
			'Email and Chat Support',
			'Access to Community Forum',
			'Single User Access',
			'Access to Basic Templates',
			'Mobile App Access',
			'1 Custom Report Per Month',
			'Monthly Product Updates',
			'Standard Security Features'
		],
		startup: ['Everything in Pro Plan', '5GB Cloud Storage', 'Email and Chat Support']
	};

	import { Badge } from '$lib/components/ui/badge';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="py-16 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<div class="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
			<div
				class="flex flex-col justify-between space-y-8 rounded-(--radius) border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10"
			>
				<div class="space-y-4">
					<div>
						<div class="flex gap-2">
							<h2 class="font-medium">Free</h2>
							{#if data.userState.activeSubscriptions.length === 0}
								<Badge>Current plan</Badge>
							{/if}
						</div>

						<span class="my-3 block text-2xl font-semibold">$0 / mo</span>
						<p class="text-muted-foreground text-sm">Per editor</p>
					</div>

					<Button href="/dashboard" variant="outline" class="w-full">Get Started</Button>

					<hr class="border-dashed" />

					<ul class="list-outside space-y-3 text-sm">
						{#each pricingList.free as item (item)}
							<li class="flex items-center gap-2">
								<Check class="size-3" />
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div
				class="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]"
			>
				<div class="grid gap-6 sm:grid-cols-2">
					<div class="space-y-4">
						<div>
							<div class="flex gap-2">
								<h2 class="font-medium">Pro</h2>
								{#if data.userState.activeSubscriptions.length > 0}
									<Badge>Current plan</Badge>
								{/if}
							</div>
							<span class="my-3 block text-2xl font-semibold">$19 / mo</span>
							<p class="text-muted-foreground text-sm">Per editor</p>
						</div>

						<Button
							class="w-full"
							onclick={() => {
								if (data.userState.activeSubscriptions.length > 0) {
									gotoPortal();
								} else {
									checkout();
								}
							}}
						>
							{data.userState.activeSubscriptions.length > 0 ? 'Manage Subscription' : 'Upgrade'}
						</Button>
					</div>

					<div>
						<div class="text-sm font-medium">Everything in free plus :</div>

						<ul class="mt-4 list-outside space-y-3 text-sm">
							{#each pricingList.pro as item (item)}
								<li class="flex items-center gap-2">
									<Check class="size-3" />
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
