<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import { AudioWaveformIcon, CommandIcon, GalleryVerticalEndIcon } from '@lucide/svelte';
	import CameraIcon from '@tabler/icons-svelte/icons/camera';
	import DashboardIcon from '@tabler/icons-svelte/icons/dashboard';
	import DatabaseIcon from '@tabler/icons-svelte/icons/database';
	import FileAiIcon from '@tabler/icons-svelte/icons/file-ai';
	import FileDescriptionIcon from '@tabler/icons-svelte/icons/file-description';
	import FileWordIcon from '@tabler/icons-svelte/icons/file-word';
	import HelpIcon from '@tabler/icons-svelte/icons/help';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';
	import ListDetailsIcon from '@tabler/icons-svelte/icons/list-details';
	import ReportIcon from '@tabler/icons-svelte/icons/report';
	import SearchIcon from '@tabler/icons-svelte/icons/search';
	import SettingsIcon from '@tabler/icons-svelte/icons/settings';
	import UsersIcon from '@tabler/icons-svelte/icons/users';

	import NavDocuments from './nav-documents.svelte';
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';

	const data = {
		documents: [
			{
				icon: DatabaseIcon,
				name: 'Data Library',
				url: '#'
			},
			{
				icon: ReportIcon,
				name: 'Reports',
				url: '#'
			},
			{
				icon: FileWordIcon,
				name: 'Word Assistant',
				url: '#'
			}
		],
		navClouds: [
			{
				icon: CameraIcon,
				isActive: true,
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				],
				title: 'Capture',
				url: '#'
			},
			{
				icon: FileDescriptionIcon,
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				],
				title: 'Proposal',
				url: '#'
			},
			{
				icon: FileAiIcon,
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				],
				title: 'Prompts',
				url: '#'
			}
		],
		navMain: [
			{
				icon: DashboardIcon,
				title: 'Dashboard',
				url: '#'
			},
			{
				icon: ListDetailsIcon,
				title: 'Forms',
				url: '#'
			},
			{
				icon: UsersIcon,
				title: 'Teams',
				url: '#'
			}
		],
		navSecondary: [
			{
				icon: SettingsIcon,
				title: 'Settings',
				url: '#'
			},
			{
				icon: HelpIcon,
				title: 'Support',
				url: '#'
			}
		],
		teams: [
			{
				logo: GalleryVerticalEndIcon,
				name: 'Acme Inc',
				plan: 'Enterprise'
			},
			{
				logo: AudioWaveformIcon,
				name: 'Acme Corp.',
				plan: 'Startup'
			},
			{
				logo: CommandIcon,
				name: 'Evil Corp.',
				plan: 'Free'
			}
		],
		user: {
			avatar: '/avatars/shadcn.jpg',
			email: 'm@example.com',
			name: 'shadcn'
		}
	};

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavDocuments items={data.documents} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser />
	</Sidebar.Footer>
</Sidebar.Root>
