<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	import { authClient } from '$lib/auth-client';
	import { toast } from 'svelte-sonner';

	let email: string = $state('');
	let password: string = $state('');

	async function handleLogin(e: Event) {
		e.preventDefault();
		try {
			await authClient.signIn.email(
				{
					callbackURL: '/dashboard',
					email,
					password,
					rememberMe: false
				},
				{
					onError: ({ error }) => {
						email = '';
						password = '';
						toast.error(error.message || 'An error occurred during login.');
					},
					onSuccess: (ctx) => {
						toast.success('Login successful!', ctx.data);
					}
				}
			);
		} catch (error) {
			// Handle (external) error logging here
			console.error(error);
		}
	}
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Welcome back</Card.Title>
			<Card.Description>Login with your Google account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleLogin} class="grid gap-6">
				<div class="grid gap-6">
					<Button
						variant="outline"
						class="w-full"
						onclick={async () => {
							await authClient.signIn.social({
								provider: 'github'
							});
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								fill="currentColor"
							/>
						</svg>
						Login with Github
					</Button>

					<div class="flex flex-col gap-4">
						<Button
							onclick={async () => {
								await authClient.signIn.social({
									provider: 'google'
								});
							}}
							variant="outline"
							class="w-full"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Login with Google
						</Button>
					</div>
					<div
						class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
					>
						<span class="bg-card text-muted-foreground relative z-10 px-2"> Or continue with </span>
					</div>
					<div class="grid gap-6">
						<div class="grid gap-3">
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								bind:value={email}
								placeholder="m@example.com"
								required
							/>
						</div>
						<div class="grid gap-3">
							<div class="flex items-center">
								<Label for="password">Password</Label>
								<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline">
									Forgot your password?
								</a>
							</div>
							<Input id="password" type="password" bind:value={password} required />
						</div>
						<Button type="submit" class="w-full">Login</Button>
					</div>
					<div class="text-center text-sm">
						Don&apos;t have an account?
						<a href="/signup" class="underline underline-offset-4"> Sign up </a>
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
