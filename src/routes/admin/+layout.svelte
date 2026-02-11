<script lang="ts">
	import Auth from '$lib/components/admin/Auth.svelte';

	let { children } = $props();
</script>

<Auth>
	<div class="container mx-auto">
		<div class="flex justify-between">
			<h1 class="text-white font-black text-2xl">HapMap Admin</h1>
			<div class="flex gap-4">
				<a class="bg-white rounded py-1 px-2 cursor-pointer" href="/admin/recepten">Recepten</a>
				<a class="bg-white rounded py-1 px-2 cursor-pointer" href="/admin/handleiding">Handleiding</a>
				<a class="bg-white rounded py-1 px-2">Stats (soon)</a>
			</div>
			<div class="text-white font-black">Logout</div>
		</div>
		{@render children()}
	</div>
</Auth>
