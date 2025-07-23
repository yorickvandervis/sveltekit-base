<script lang="ts">
	import type { WithoutChildren } from '$lib/utils.js';
	import type { Icon } from '@tabler/icons-svelte';
	import type { ComponentProps } from 'svelte';

	import * as Sidebar from '$lib/components/ui/sidebar';

	let {
		items,
		...restProps
	}: WithoutChildren<ComponentProps<typeof Sidebar.Group>> & {
		items: { icon: Icon; title: string; url: string }[];
	} = $props();
</script>

<Sidebar.Group {...restProps}>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
