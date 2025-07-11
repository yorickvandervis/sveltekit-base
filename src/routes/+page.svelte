<script lang="ts">
	import { BetterAuth, Drizzle, Polar, Shadcn, SvelteKit, TailwindCSS } from '$lib/assets/logos';
	import { authClient } from '$lib/auth-client';
	import HomepageCard from '$lib/components/homepage-card.svelte';

	const session = authClient.useSession();
</script>

<!-- Header Section with Authentication -->
<header class="border-b">
	<div class="mx-auto max-w-5xl px-6 py-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<h1 class="text-xl font-bold">SvelteKit Base</h1>
			</div>

			<div class="flex items-center space-x-4">
				{#if $session.data}
					<div class="flex items-center space-x-4">
						<div class="text-sm">
							<span class="text-muted-foreground">Welcome back,</span>
							<span class="font-medium">{$session.data.user.name || $session.data.user.email}</span>
						</div>
						{#if $session.data.user.image}
							<img src={$session.data.user.image} alt="Profile" class="h-8 w-8 rounded-full" />
						{/if}
						<button
							on:click={async () => {
								await authClient.signOut();
							}}
							class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
						>
							Sign Out
						</button>
					</div>
				{:else}
					<div class="flex items-center space-x-2">
						<a
							href="/login"
							class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none"
						>
							Sign In
						</a>
						<a
							href="/signup"
							class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
						>
							Sign Up
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>

<!-- Hero Section -->
<section>
	<div class="pt-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="text-center">
				{#if $session.data}
					<h2 class="text-3xl font-semibold text-balance md:text-4xl">
						Welcome back, {$session.data.user.name || 'User'}!
					</h2>
					<p class="text-muted-foreground mt-6">
						You're now signed in and can access all features. Explore the tools below to enhance
						your workflow.
					</p>
				{:else}
					<h2 class="text-3xl font-semibold text-balance md:text-4xl">Welcome to SvelteKit Base</h2>
					<p class="text-muted-foreground mt-6">
						Sign in to access all features and integrate with your favorite tools and services.
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Tools Integration Section -->
<section>
	<div class="mx-auto max-w-5xl px-6">
		<div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			<HomepageCard
				title="SvelteKit"
				description="Full-stack framework for building modern web applications with Svelte."
			>
				<SvelteKit />
			</HomepageCard>

			<HomepageCard
				title="Drizzle"
				description="Type-safe ORM for TypeScript with SQL-like query builder."
			>
				<Drizzle />
			</HomepageCard>

			<HomepageCard
				title="TailwindCSS"
				description="Utility-first CSS framework for rapid UI development."
			>
				<TailwindCSS />
			</HomepageCard>

			<HomepageCard
				title="ShadCN-Svelte"
				description="Beautiful and accessible UI components built with Svelte."
			>
				<Shadcn />
			</HomepageCard>

			<HomepageCard
				title="Polar"
				description="Modern developer tooling for better authentication experiences."
			>
				<Polar />
			</HomepageCard>

			<HomepageCard
				title="BetterAuth"
				description="Flexible authentication library with social login support."
			>
				<BetterAuth />
			</HomepageCard>
		</div>
	</div>
</section>
