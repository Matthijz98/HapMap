<script lang="ts" generics="T extends { sqid: string; tempId?: string }">
	interface Props {
		items: T[];
		onReorder: (items: T[]) => void;
		children: (item: T, index: number) => any;
	}

	let { items = $bindable(), onReorder, children }: Props = $props();

	let draggedIndex = $state<number | null>(null);

	// Helper function to move array items
	function arrayMove(arr: ItemType[], from: number, to: number): ItemType[] {
		const newArr = [...arr];
		const item = newArr.splice(from, 1)[0];
		newArr.splice(to, 0, item);
		return newArr;
	}

	function handleDragStart(index: number) {
		draggedIndex = index;
	}

	function handleDragOver(event: DragEvent, index: number) {
		event.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			const reordered = arrayMove(items, draggedIndex, index);
			onReorder(reordered);
			draggedIndex = index;
		}
	}

	function handleDragEnd() {
		draggedIndex = null;
	}

	function moveUp(index: number) {
		if (index > 0) {
			const reordered = arrayMove(items, index, index - 1);
			onReorder(reordered);
		}
	}

	function moveDown(index: number) {
		if (index < items.length - 1) {
			const reordered = arrayMove(items, index, index + 1);
			onReorder(reordered);
		}
	}

	function remove(index: number) {
		const filtered = items.filter((_, i) => i !== index);
		onReorder(filtered);
	}
</script>

<div class="space-y-2">
	{#each items as item, index (item.tempId || item.sqid)}
		<div
			role="listitem"
			ondragover={(e) => handleDragOver(e, index)}
			class="p-3 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors"
			class:opacity-50={draggedIndex === index}
		>
			<div class="flex items-start gap-2">
				<button
					type="button"
					draggable="true"
					ondragstart={() => handleDragStart(index)}
					ondragend={handleDragEnd}
					class="cursor-move px-2 py-1 text-gray-500 hover:text-gray-700 flex-shrink-0"
					title="Sleep om te verplaatsen"
				>
					☰
				</button>

				<div class="flex-1 min-w-0">
					{@render children(item, index)}
				</div>

				<div class="flex flex-col gap-1 flex-shrink-0">
					<button
						type="button"
						onclick={() => moveUp(index)}
						disabled={index === 0}
						class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
						title="Omhoog"
					>
						↑
					</button>
					<button
						type="button"
						onclick={() => moveDown(index)}
						disabled={index === items.length - 1}
						class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
						title="Omlaag"
					>
						↓
					</button>
					<button
						type="button"
						onclick={() => remove(index)}
						class="px-2 py-1 text-red-500 hover:text-red-700"
						title="Verwijderen"
					>
						×
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>
