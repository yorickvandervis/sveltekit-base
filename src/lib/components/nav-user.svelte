<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import CreditCardIcon from '@tabler/icons-svelte/icons/credit-card';
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import NotificationIcon from '@tabler/icons-svelte/icons/notification';
	import UserCircleIcon from '@tabler/icons-svelte/icons/user-circle';

	const sidebar = Sidebar.useSidebar();
	const session = authClient.useSession();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="size-8 rounded-lg grayscale">
							<Avatar.Image src={$session.data?.user?.image} alt={$session.data?.user?.name} />
							<Avatar.Fallback class="rounded-lg">
								{($session.data?.user?.name && $session.data.user.name[0]) || 'U'}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{$session.data?.user?.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{$session.data?.user?.email}
							</span>
						</div>
						<DotsVerticalIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={$session.data?.user?.image} alt={$session.data?.user?.name} />
							<Avatar.Fallback class="rounded-lg">
								{($session.data?.user?.name && $session.data.user.name[0]) || 'U'}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{$session.data?.user?.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{$session.data?.user?.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<!-- <DropdownMenu.Item>
						<UserCircleIcon />
						Account
					</DropdownMenu.Item> -->
					<a href="/dashboard/subscription">
						<DropdownMenu.Item>
							<CreditCardIcon />
							Subscription
						</DropdownMenu.Item></a
					>
					<DropdownMenu.Item>
						<NotificationIcon />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<LogoutIcon />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
