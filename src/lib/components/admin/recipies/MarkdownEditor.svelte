<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css';

	interface Props {
		value: string;
		onUpdate: (value: string) => void;
		placeholder?: string;
	}

	let {
		value = $bindable(''),
		onUpdate,
		placeholder = 'Typ hier...'
	}: Props = $props();

	const carta = new Carta({
		sanitizer: false,
		disableIcons: ['bulletedList', 'numberedList', 'taskList']
	});

	// Watch for value changes and call onUpdate
	$effect(() => {
		onUpdate(value);
	});
</script>

<div class="markdown-editor-wrapper">
	<MarkdownEditor {carta} bind:value {placeholder} mode="tabs" />
</div>

<style>
    /* Make textarea start at 2 lines (~3rem) and auto-grow */
    .markdown-editor-wrapper :global(.carta-input),
    .markdown-editor-wrapper :global(textarea.carta-input) {
        min-height: 3rem !important;
        height: auto !important;
        max-height: 500px;
        overflow-y: auto !important;
        resize: vertical;
    }

    /* Hide list-related toolbar buttons */
    .markdown-editor-wrapper :global([aria-label='Bulleted list']),
    .markdown-editor-wrapper :global([aria-label='Numbered list']),
    .markdown-editor-wrapper :global([aria-label='Task list']) {
        display: none !important;
    }
</style>

