<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	let loading: boolean = $state(false);
	let email: string = $state('');
	let name: string = $state('');
	let password: string = $state('');

	async function handleSignup(event: Event) {
		event.preventDefault();

		try {
			await authClient.signUp.email(
				{
					callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
					email, // user email address
					name, // user display name
					password // user password -> min 8 characters by default
				},
				{
					onError: (ctx) => {
						loading = false;
						toast.error(ctx.error.message || 'An error occurred during signup.');
					},
					onRequest: () => {
						loading = true;
					},
					onSuccess: (ctx) => {
						loading = false;
						toast.success(
							ctx.data.message || 'Signup successful! Check your email for verification.'
						);
						goto('/');
					}
				}
			);
		} catch (error) {
			// Handle (external) error logging here
			console.error('Signup error:', error);
		}
	}
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Sign up</Card.Title>
			<Card.Description>Create a new account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleSignup} class="grid gap-6">
				<div class="grid gap-6">
					<div class="grid gap-6">
						<div class="grid gap-3">
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								bind:value={email}
								placeholder="john@doe.com"
								required
							/>
						</div>
						<div class="grid gap-3">
							<Label for="email">Name</Label>
							<Input id="name" type="name" bind:value={name} placeholder="John Doe" required />
						</div>
						<div class="grid gap-3">
							<div class="flex items-center">
								<Label for="password">Password</Label>
							</div>
							<Input id="password" type="password" bind:value={password} required />
						</div>
						<Button type="submit" class="w-full" disabled={loading}>
							<span transition:fade>
								{#if loading}
									Signin you up..
								{:else}
									Sign up
								{/if}
							</span>
						</Button>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
	<div
		class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		By clicking continue, you agree to our <a href="##">Terms of Service</a>
		and <a href="##">Privacy Policy</a>.
	</div>
</div>
