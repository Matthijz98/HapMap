<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo.png';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();

	import { client as public_client } from '$lib/api/public-client/client.gen';
	import { client as private_client } from '$lib/api/private-client/client.gen';
	import { PUBLIC_API_HOST } from '$env/static/public';

	public_client.setConfig({
		baseUrl: PUBLIC_API_HOST
	});

	private_client.setConfig({
		baseUrl: PUBLIC_API_HOST
	})

	const queryClient = new QueryClient({});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
