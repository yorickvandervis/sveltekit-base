<script lang="ts">
	import { dev } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Progress } from '$lib/components/ui/progress';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import Rocket from '@lucide/svelte/icons/rocket';
	import UserPlus from '@lucide/svelte/icons/square-plus';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	import { schemaStep1, schemaStep2 } from './schema';

	let { data } = $props();
	const steps = [zod(schemaStep1), zod(schemaStep2)];
	let step = $state(1);
	let stepProgress = $derived.by(() => (step / 3) * 100);

	const form = superForm(data.form, {
		dataType: 'json',
		async onSubmit({ cancel }) {
			// If on last step, make a normal request
			if (step == steps.length) return;
			else cancel();

			// Make a manual client-side validation, since we have cancelled
			const result = await validateForm({ update: true });
			if (result.valid) step = step + 1;
		},

		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});
	const { enhance, form: formData, options, validateForm } = form;

	$effect(() => {
		options.validators = steps[step - 1];
	});

	let newInviteEmail = $state('');

	function addInvitee() {
		if (newInviteEmail) {
			// schemaStep3 expects invites: string[]
			$formData.invites = [...$formData.invites, newInviteEmail];
			newInviteEmail = '';
		}
	}
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="flex w-full max-w-lg flex-col gap-6">
		<a href="##" class="flex items-center gap-2 self-center font-medium">
			<div
				class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
			>
				<GalleryVerticalEndIcon class="size-4" />
			</div>
			SvelteKit Base.
		</a>
		<div class="flex flex-col gap-6">
			<Card.Root>
				<Card.Header class="text-center">
					<Card.Title class="text-x3l">Welcome!</Card.Title>
					<Card.Description>Let's create a new organization.</Card.Description>
				</Card.Header>
				<Card.Content>
					<form use:enhance method="POST" class="grid gap-6">
						<div class="grid gap-6">
							<div class="flex flex-col gap-4">
								<Progress value={stepProgress} class="h-2" />
							</div>
							<div
								class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
							>
								<span class="bg-card text-muted-foreground relative z-10 px-2">
									Step {step} of 3</span
								>
							</div>
							{#if step === 1}
								<Form.Field {form} name="" class="grid gap-1">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label for="name">Organization name</Form.Label>
											<Input
												{...props}
												bind:value={$formData.name}
												required
												type="text"
												placeholder="SvelteKit Base"
											/>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Field {form} name="slug" class="grid gap-1">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label for="name">Slug</Form.Label>
											<Input
												{...props}
												bind:value={$formData.slug}
												required
												type="text"
												placeholder="sveltekit-base"
											/>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
							{:else if step === 2}
								<Form.Field {form} name="invites" class="grid gap-2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Invite collaborators</Form.Label>
											<div class="grid gap-2">
												<div class="flex gap-2">
													<Input
														{...props}
														bind:value={newInviteEmail}
														type="email"
														placeholder="Email"
													/>
													<Button type="button" onclick={addInvitee}>
														<UserPlus class="size-4" />
														Add
													</Button>
												</div>
											</div>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
									<!-- simple list of all added invitees -->
									<p class="text-muted-foreground text-sm">
										{$formData.invites.length} collaborators added
									</p>

									<ul class="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
										{#each $formData.invites as inv, idx (idx)}
											<li>{inv}</li>
										{/each}
									</ul>
								</Form.Field>
							{/if}
							<Form.Button class="w-full" type="submit">
								{#if step === 2}
									Complete Onboarding <Rocket class="mr-2 inline size-4" />
								{:else}
									Next step
								{/if}
							</Form.Button>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
			{#if dev}
				<SuperDebug data={$formData} />
			{/if}
		</div>
	</div>
</div>
