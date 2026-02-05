<script lang="ts">
	let { children } = $props();
</script>

<div class="container mx-auto">
	<div class="flex justify-between">
		<h1 class="text-white font-black text-2xl">HapMap Admin</h1>
		<div class="flex gap-4">
			<a>Recepten</a>
			<a>Handleiding</a>
			<a>Stats</a>
		</div>
		<div class="text-white font-black">Logout</div>
	</div>
	{@render children()}
</div>