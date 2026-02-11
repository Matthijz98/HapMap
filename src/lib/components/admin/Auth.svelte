<script lang="ts">
	import { browser } from '$app/environment';

	import {PUBLIC_AUTH_CLIENT_ID, PUBLIC_API_HOST} from '$env/static/public'

	import {
		OidcContext,
		LoginButton,
		isAuthenticated,
		accessToken,
	} from '@dopry/svelte-oidc';
	import { client } from '$lib/api/private-client/client.gen';

	let { children } = $props();

	accessToken.subscribe((token: string | null) => {
		client.interceptors.request.use(async (request) => {
			try {
				// Use the access token from the OIDC store
				if (token) {
					request.headers.set('Authorization', 'Bearer ' + token);
				}
			} catch (error) {
				console.error('Failed to get OIDC access token:', error);
			}
			return request;
		});
	});
</script>

{#if browser}
	<OidcContext
		issuer={`${PUBLIC_API_HOST}/oauth/`}
		client_id={PUBLIC_AUTH_CLIENT_ID}
		redirect_uri={`${window.location.origin}/admin/recepten`}
	>
		{#if $isAuthenticated}
			<div class="container mx-auto mt-4 p-2">
				{@render children()}
			</div>
		{:else}
			<div class="min-h-svh flex items-center justify-center">
				<div class="bg-slate-100 rounded p-8 text-center">
					<img class="w-52 px-12 mx-auto" src="/logo.png" alt="HapMap logo">
					<h2 class="mt-4 mb-6">Login met je SchuitAccount</h2>
					<div class="flex items-center justify-center">
						<LoginButton classes="rounded px-2 py-1 bg-slate-300 hover:bg-slate-500">Login</LoginButton>
					</div>
				</div>
			</div>


		{/if}

	</OidcContext>
{/if}