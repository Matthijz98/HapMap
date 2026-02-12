<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo.png';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { client as public_client } from '$lib/api/public-client/client.gen';
	import { client as private_client } from '$lib/api/private-client/client.gen';
	import { PUBLIC_API_HOST } from '$env/static/public';
	import NavBar from "$lib/components/public/NavBar.svelte";
	import {dev} from "$app/environment";

	let { children } = $props();

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
<!-- if build include tracking -->
	{#if !dev}
		<script defer src="https://a.sliceofbits.com/script.js" data-website-id="51d15d14-9b67-4178-9754-a9a39a09cb4b"></script>
	{/if}
</svelte:head>

<QueryClientProvider client={queryClient}>
	<NavBar/>
	{@render children()}
</QueryClientProvider>
