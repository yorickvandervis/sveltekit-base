<script lang="ts">
	import { type ChartConfig, THEMES } from './chart-utils.js';

	let { config, id }: { config: ChartConfig; id: string; } = $props();

	const colorConfig = $derived(
		config ? Object.entries(config).filter(([, config]) => config.theme || config.color) : null
	);

	const themeContents = $derived.by(() => {
		if (!colorConfig || !colorConfig.length) return;

		const themeContents = [];
		for (let [_theme, prefix] of Object.entries(THEMES)) {
			let content = `${prefix} [data-chart=${id}] {\n`;
			const color = colorConfig.map(([key, itemConfig]) => {
				const theme = _theme as keyof typeof itemConfig.theme;
				const color = itemConfig.theme?.[theme] || itemConfig.color;
				return color ? `\t--color-${key}: ${color};` : null;
			});

			content += color.join('\n') + '\n}';

			themeContents.push(content);
		}

		return themeContents.join('\n');
	});
</script>

{#if themeContents}
	{#key id}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<style>${themeContents}</style>`}
	{/key}
{/if}
