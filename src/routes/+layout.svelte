<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query';
	
	let { children } = $props();

    import { client } from '$lib/client/client.gen';

    client.setConfig({
        baseUrl: 'http://127.0.0.1:8000/',
    });

    const queryClient = new QueryClient({})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
    {@render children()}
</QueryClientProvider>
