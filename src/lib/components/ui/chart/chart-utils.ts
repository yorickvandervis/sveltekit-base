import type { Tooltip } from 'layerchart';

import { type Component, type ComponentProps, getContext, setContext, type Snippet } from 'svelte';

export const THEMES = { dark: '.dark', light: '' } as const;

export type ChartConfig = {
	[k in string]: {
		icon?: Component;
		label?: string;
	} & (
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
		| { color?: string; theme?: never }
	);
};

export type ExtractSnippetParams<T> = T extends Snippet<[infer P]> ? P : never;

export type TooltipPayload = ExtractSnippetParams<
	ComponentProps<typeof Tooltip.Root>['children']
>['payload'][number];

type ChartContextValue = {
	config: ChartConfig;
};

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: TooltipPayload,
	key: string
) {
	if (typeof payload !== 'object' || payload === null) return undefined;

	const payloadPayload =
		'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
			? payload.payload
			: undefined;

	let configLabelKey: string = key;

	if (payload.key === key) {
		configLabelKey = payload.key;
	} else if (payload.name === key) {
		configLabelKey = payload.name;
	} else if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		payloadPayload !== undefined &&
		key in payloadPayload &&
		typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
	) {
		configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
	}

	return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

const chartContextKey = Symbol('chart-context');

export function setChartContext(value: ChartContextValue) {
	return setContext(chartContextKey, value);
}

export function useChart() {
	return getContext<ChartContextValue>(chartContextKey);
}
