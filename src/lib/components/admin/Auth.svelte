<script lang="ts">
	import { browser } from '$app/environment';
	import NavBar from '$lib/Components/NavBar/NavBar.svelte';
	import {PUBLIC_AUTH_CLIENT_ID, PUBLIC_API_HOST} from '$env/static/public'

	import {
		OidcContext,
		LoginButton,
		isAuthenticated,
	} from '@dopry/svelte-oidc';
	import Card from '$lib/Components/UI/Card.svelte';

	let { children } = $props();
</script>

{#if browser}
	<OidcContext
		issuer={`${PUBLIC_API_HOST}/oauth/`}
		client_id={PUBLIC_AUTH_CLIENT_ID}
		redirect_uri={window.location.origin}
	>
		{#if $isAuthenticated}
			<NavBar />
			<div class="container mx-auto mt-4 p-2">
				{@render children()}
			</div>
		{:else}
			<div class="min-h-svh flex items-center justify-center">
				<Card>
					<img class="w-52 px-12 mx-auto" src="/logo.png" alt="blauwe schuit logo">
					<h2 class="mt-4 mb-6">Login met je SchuitAccount</h2>
					<div class="flex items-center justify-center">
						<LoginButton classes="rounded px-2 py-1 bg-slate-300 hover:bg-slate-500">Login</LoginButton>
					</div>
				</Card>
			</div>


		{/if}

	</OidcContext>
{/if}