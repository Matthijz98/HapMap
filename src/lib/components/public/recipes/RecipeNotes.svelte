<script lang="ts">
	import type { RecipeNoteOutSchema } from '$lib/api/public-client/types.gen';

	interface Props {
		notes: RecipeNoteOutSchema[];
	}

	let { notes }: Props = $props();

	// Sort notes by order
	const sortedNotes = $derived(
		[...notes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
	);

	function getNoteClasses(type?: string): string {
		switch (type) {
			case 'tip':
				return 'bg-green-100 border-green-400 text-green-900';
			case 'warning':
				return 'bg-orange-100 border-orange-400 text-orange-900';
			case 'info':
			default:
				return 'bg-blue-100 border-blue-400 text-blue-900';
		}
	}

	function getNoteLabel(type?: string): string {
		switch (type) {
			case 'tip':
				return 'Tip';
			case 'warning':
				return 'Waarschuwing';
			case 'info':
			default:
				return 'Info';
		}
	}
</script>

{#if sortedNotes.length > 0}
	<div class="space-y-3">
		<h2 class="text-2xl font-semibold text-white">Notities</h2>
		<div class="space-y-2">
			{#each sortedNotes as note (note.sqid)}
				<div
					class="rounded-lg border-2 px-4 py-3 {getNoteClasses(note.type)}"
				>
					<div class="flex items-start gap-2">
						<span class="font-bold text-sm uppercase tracking-wide">
							{getNoteLabel(note.type)}:
						</span>
						<div class="flex-1 text-sm">
							{note.note}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
