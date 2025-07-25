<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import { getTooltipContext, Tooltip as TooltipPrimitive } from 'layerchart';

	import { getPayloadConfigFromPayload, type TooltipPayload, useChart } from './chart-utils.js';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function defaultFormatter(value: any, _payload: TooltipPayload[]) {
		return `${value}`;
	}

	let {
		class: className,
		color,
		formatter,
		hideIndicator = false,
		hideLabel = false,
		indicator = 'dot',
		label,
		labelClassName,
		labelFormatter = defaultFormatter,
		labelKey,
		nameKey,
		ref = $bindable(null),
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
		formatter?: Snippet<
			[
				{
					index: number;
					item: TooltipPayload;
					name: string;
					payload: TooltipPayload[];
					value: unknown;
				}
			]
		>;
		hideIndicator?: boolean;
		hideLabel?: boolean;
		indicator?: 'dashed' | 'dot' | 'line';
		label?: string;
		labelClassName?: string;
		labelFormatter?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
		((value: any, payload: TooltipPayload[]) => number | Snippet | string) | null;
		labelKey?: string;
		nameKey?: string;
	} = $props();

	const chart = useChart();
	const tooltipCtx = getTooltipContext();

	const formattedLabel = $derived.by(() => {
		if (hideLabel || !tooltipCtx.payload?.length) return null;

		const [item] = tooltipCtx.payload;
		const key = labelKey ?? item?.label ?? item?.name ?? 'value';

		const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);

		const value =
			!labelKey && typeof label === 'string'
				? (chart.config[label as keyof typeof chart.config]?.label ?? label)
				: (itemConfig?.label ?? item.label);

		if (value === undefined) return null;
		if (!labelFormatter) return value;
		return labelFormatter(value, tooltipCtx.payload);
	});

	const nestLabel = $derived(tooltipCtx.payload.length === 1 && indicator !== 'dot');
</script>

{#snippet TooltipLabel()}
	{#if formattedLabel}
		<div class={cn('font-medium', labelClassName)}>
			{#if typeof formattedLabel === 'function'}
				{@render formattedLabel()}
			{:else}
				{formattedLabel}
			{/if}
		</div>
	{/if}
{/snippet}

<TooltipPrimitive.Root variant="none">
	<div
		class={cn(
			'border-border/50 bg-background grid min-w-[9rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
			className
		)}
		{...restProps}
	>
		{#if !nestLabel}
			{@render TooltipLabel()}
		{/if}
		<div class="grid gap-1.5">
			{#each tooltipCtx.payload as item, i (item.key + i)}
				{@const key = `${nameKey || item.key || item.name || 'value'}`}
				{@const itemConfig = getPayloadConfigFromPayload(chart.config, item, key)}
				{@const indicatorColor = color || item.payload?.color || item.color}
				<div
					class={cn(
						'[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5',
						indicator === 'dot' && 'items-center'
					)}
				>
					{#if formatter && item.value !== undefined && item.name}
						{@render formatter({
							index: i,
							item,
							name: item.name,
							payload: tooltipCtx.payload,
							value: item.value
						})}
					{:else}
						{#if itemConfig?.icon}
							<itemConfig.icon />
						{:else if !hideIndicator}
							<div
								style="--color-bg: {indicatorColor}; --color-border: {indicatorColor};"
								class={cn('shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)', {
									'h-full w-1': indicator === 'line',
									'my-0.5': nestLabel && indicator === 'dashed',
									'size-2.5': indicator === 'dot',
									'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed'
								})}
							></div>
						{/if}
						<div
							class={cn(
								'flex flex-1 shrink-0 justify-between leading-none',
								nestLabel ? 'items-end' : 'items-center'
							)}
						>
							<div class="grid gap-1.5">
								{#if nestLabel}
									{@render TooltipLabel()}
								{/if}
								<span class="text-muted-foreground">
									{itemConfig?.label || item.name}
								</span>
							</div>
							{#if item.value !== undefined}
								<span class="text-foreground font-mono font-medium tabular-nums">
									{item.value.toLocaleString()}
								</span>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</TooltipPrimitive.Root>
