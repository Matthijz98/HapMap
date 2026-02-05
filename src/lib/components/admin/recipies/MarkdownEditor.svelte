<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css';

	interface Props {
		value: string;
		onUpdate: (value: string) => void;
		placeholder?: string;
		mode?: 'step' | 'description';
	}

	let {
		value = $bindable(''),
		onUpdate,
		placeholder = 'Typ hier...',
		mode = 'step'
	}: Props = $props();

	const carta = new Carta({
		sanitizer: false
	});

	// Watch for value changes and call onUpdate
	$effect(() => {
		onUpdate(value);
	});
</script>

<div class="carta-wrapper" class:description-mode={mode === 'description'}>
	<MarkdownEditor {carta} bind:value {placeholder} mode="auto" />
</div>

<style>
	.carta-wrapper :global(.carta-editor) {
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		overflow: hidden;
	}

	.carta-wrapper :global(.carta-toolbar) {
		background: #f9fafb;
		border-bottom: 1px solid #d1d5db;
		padding: 0.5rem;
	}

	.carta-wrapper :global(.carta-input) {
		min-height: 80px;
		padding: 0.5rem;
		font-family: ui-monospace, 'Cascadia Code', 'Courier New', monospace;
		font-size: 0.875rem;
	}

	.description-mode :global(.carta-input) {
		min-height: 120px;
	}
</style>
