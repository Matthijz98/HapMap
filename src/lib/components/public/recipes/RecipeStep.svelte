<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	const { step, index } = $props();
</script>

<div class="flex gap-4 mb-4">
	<div
		class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm"
	>
		{index + 1}
	</div>
	<div class="flex-1 pt-1">
		<SvelteMarkdown source={step.instruction} />
	</div>
</div>