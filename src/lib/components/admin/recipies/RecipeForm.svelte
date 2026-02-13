<script lang="ts">
	import type {
		RecipeOutSchema,
		RecipeStepOutSchema,
		RecipeIngredientOutSchema,
		RecipeNoteOutSchema,
		IngredientOutSchema,
		RecipeCategoryOutSchema,
		AllergyOutSchema
	} from '$lib/api/public-client/types.gen';
	import { ingredientsApiPrivateCreateIngredientMutation } from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import { ingredientsApiPrivateGetAllergies } from '$lib/api/private-client/sdk.gen';
	import { createMutation } from '@tanstack/svelte-query';
	import AlternativeIngredientsEditor from './AlternativeIngredientsEditor.svelte';
	import FuzzyIngredientSearch from './FuzzyIngredientSearch.svelte';
	import UnitSelect from './UnitSelect.svelte';
	import CategorySelect from './CategorySelect.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';
	import DraggableList from '$lib/components/utils/DraggableList.svelte';
	import IngredientForm from '$lib/components/admin/ingredients/IngredientForm.svelte';

	interface Props {
		recipe?: RecipeOutSchema;
		onSave: (recipe: Partial<RecipeOutSchema>) => void;
		onCancel: () => void;
		availableIngredients?: IngredientOutSchema[];
		availableCategories?: RecipeCategoryOutSchema[];
	}

	let {
		recipe = $bindable(),
		onSave,
		onCancel,
		availableIngredients = [],
		availableCategories = []
	}: Props = $props();

	// Form state
	let name = $state(recipe?.name || '');
	let short_description = $state(recipe?.short_description || '');
	let selectedCategorySqid = $state(recipe?.category?.sqid || '');

	// Modal state for creating new ingredients
	let showIngredientModal = $state(false);
	let availableAllergies = $state<AllergyOutSchema[]>([]);

	// Load allergies on mount
	$effect(() => {
		loadAllergies();
	});

	async function loadAllergies() {
		try {
			const response = await ingredientsApiPrivateGetAllergies();
			if (response.data && Array.isArray(response.data)) {
				availableAllergies = response.data as AllergyOutSchema[];
			}
		} catch (error) {
			console.error('Failed to load allergies:', error);
		}
	}

	const createIngredientMutation = createMutation(() => ({
		...ingredientsApiPrivateCreateIngredientMutation(),
		onSuccess: (data) => {
			const created = data as IngredientOutSchema | undefined;
			// Add the new ingredient to the available list
			if (created && created.sqid) {
				availableIngredients = [...availableIngredients, created];
			}
			// Reset modal
			showIngredientModal = false;
		}
	}));

	type IngredientFormPayload = {
		name_singular: string;
		name_plural: string;
		allergy_sqids: string[];
	};

	function handleCreateIngredient(payload: IngredientFormPayload) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createIngredientMutation.mutate({
			body: payload as any
		});
	}

	// Steps state
	let steps = $state<Array<RecipeStepOutSchema & { tempId?: string }>>(
		recipe?.steps?.map((s, i) => ({ ...s, order: i })) || []
	);

	// Ingredients state
	let ingredients = $state<
		Array<RecipeIngredientOutSchema & { tempId?: string }>
	>(recipe?.ingredients?.map((ing) => ({
		...ing,
		ingredient_alternatives: ing.ingredient_alternatives || []
	})) || []);

	// Notes state
	let notes = $state<Array<RecipeNoteOutSchema & { tempId?: string }>>(
		recipe?.notes?.map((n, i) => ({ ...n, order: i })) || []
	);

	// Drag state
	let draggedStepIndex = $state<number | null>(null);
	let draggedIngredientIndex = $state<number | null>(null);

	// Helper function to move array items
	function arrayMove<T>(arr: T[], from: number, to: number): T[] {
		const newArr = [...arr];
		const item = newArr.splice(from, 1)[0];
		newArr.splice(to, 0, item);
		return newArr;
	}

	// Step management
	function addStep() {
		const newStep = {
			sqid: `temp-${Date.now()}`,
			tempId: `temp-${Date.now()}`,
			order: steps.length,
			instruction: ''
		};
		steps = [...steps, newStep];
	}

	function removeStep(index: number) {
		steps = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i }));
	}

	function moveStepUp(index: number) {
		if (index > 0) {
			steps = arrayMove(steps, index, index - 1).map((s, i) => ({ ...s, order: i }));
		}
	}

	function moveStepDown(index: number) {
		if (index < steps.length - 1) {
			steps = arrayMove(steps, index, index + 1).map((s, i) => ({ ...s, order: i }));
		}
	}

	function handleStepDragEnd() {
		draggedStepIndex = null;
	}

	// Ingredient management
	function addIngredient() {
		const newIngredient: RecipeIngredientOutSchema & { tempId?: string } = {
			sqid: `temp-${Date.now()}`,
			tempId: `temp-${Date.now()}`,
			quantity: 0,
			unit: 'gr',
			ingredient: {
				sqid: '',
				name_singular: '',
				name_plural: ''
			},
			ingredient_alternatives: []
		};
		ingredients = [...ingredients, newIngredient];
	}

	function removeIngredient(index: number) {
		ingredients = ingredients.filter((_, i) => i !== index);
	}

	function moveIngredientUp(index: number) {
		if (index > 0) {
			ingredients = arrayMove(ingredients, index, index - 1);
		}
	}

	function moveIngredientDown(index: number) {
		if (index < ingredients.length - 1) {
			ingredients = arrayMove(ingredients, index, index + 1);
		}
	}

	// Ingredient drag handlers
	function handleIngredientDragStart(index: number) {
		draggedIngredientIndex = index;
	}

	function handleIngredientDragOver(event: DragEvent, index: number) {
		event.preventDefault();
		if (draggedIngredientIndex !== null && draggedIngredientIndex !== index) {
			ingredients = arrayMove(ingredients, draggedIngredientIndex, index);
			draggedIngredientIndex = index;
		}
	}

	function handleIngredientDragEnd() {
		draggedIngredientIndex = null;
	}

	// Note management
	function addNote() {
		const newNote: RecipeNoteOutSchema & { tempId?: string } = {
			sqid: `temp-${Date.now()}`,
			tempId: `temp-${Date.now()}`,
			order: notes.length,
			note: '',
			type: 'info'
		};
		notes = [...notes, newNote];
	}

	// Form submission
	function handleSubmit() {
		const selectedCategory = availableCategories.find(
			(c) => c.sqid === selectedCategorySqid
		);

		const recipeData: Partial<RecipeOutSchema> = {
			...(recipe?.sqid && { sqid: recipe.sqid }),
			name,
			short_description: short_description || null,
			category: selectedCategory!,
			steps: steps.map((s, i) => ({
				sqid: s.tempId ? '' : s.sqid,
				order: i,
				instruction: s.instruction
			})),
			ingredients: ingredients
				.filter((ing) => ing.ingredient.sqid)
				.map((ing) => ({
					sqid: ing.tempId ? '' : ing.sqid,
					quantity: ing.quantity,
					unit: ing.unit,
					ingredient: ing.ingredient,
					ingredient_alternatives: ing.ingredient_alternatives
				})),
			notes: notes
				.filter((n) => n.note.trim())
				.map((n, i) => ({
					sqid: n.tempId ? '' : n.sqid,
					order: i,
					note: n.note,
					type: n.type
				}))
		};

		onSave(recipeData);
	}
</script>

<div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
	<h2 class="text-2xl font-bold mb-6">{recipe ? 'Recept bewerken' : 'Nieuw recept'}</h2>

	<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
		<!-- Basic Info -->
		<div class="space-y-4 mb-6">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 mb-1"
					>Naam *</label
				>
				<input
					id="name"
					type="text"
					bind:value={name}
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

		<div>
			<label for="category" class="block text-sm font-medium text-gray-700 mb-1"
				>Categorie *</label
			>
			<CategorySelect
				categories={availableCategories}
				selected={selectedCategorySqid}
				onSelect={(sqid) => (selectedCategorySqid = sqid)}
			/>
		</div>

			<div>
				<label for="short_description" class="block text-sm font-medium text-gray-700 mb-1"
					>Beschrijving</label
				>
				<MarkdownEditor
					bind:value={short_description}
					onUpdate={(val) => (short_description = val)}
					placeholder="Beschrijf het recept..."
				/>
			</div>
		</div>

		<!-- Ingredients Section -->
		<div class="mb-6">
			<div class="flex items-center justify-between mb-3">
				<h3 class="text-lg font-semibold">Ingrediënten</h3>
				<button
					type="button"
					onclick={() => (showIngredientModal = true)}
					class="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
				>
					+ Nieuw Ingredient
				</button>
			</div>

			<div class="space-y-2">
				{#each ingredients as ingredient, index (ingredient.tempId || ingredient.sqid)}
					<div
						role="listitem"
						ondragover={(e) => handleIngredientDragOver(e, index)}
						class="p-3 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors"
						class:opacity-50={draggedIngredientIndex === index}
					>
						<div class="flex items-center gap-2">
							<button
								type="button"
								draggable="true"
								ondragstart={() => handleIngredientDragStart(index)}
								ondragend={handleIngredientDragEnd}
								class="cursor-move px-2 py-1 text-gray-500 hover:text-gray-700"
								title="Sleep om te verplaatsen"
							>
								☰
							</button>

							<div class="flex-1">
								<FuzzyIngredientSearch
									ingredients={availableIngredients}
									selected={ingredient.ingredient.sqid}
									onSelect={(sqid) => {
										const selected = availableIngredients.find((ing) => ing.sqid === sqid);
										if (selected) {
											ingredient.ingredient = selected;
										}
									}}
									placeholder="Zoek ingredient..."
								/>
							</div>

							<input
								type="number"
								bind:value={ingredient.quantity}
								step="0.001"
								placeholder="Aantal"
								class="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
							/>

							<div class="w-32">
								<UnitSelect
									selected={ingredient.unit}
									onSelect={(unit) => {
										ingredient.unit = unit;
									}}
								/>
							</div>

							<div class="flex gap-1">
								<button
									type="button"
									onclick={() => moveIngredientUp(index)}
									disabled={index === 0}
									class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
									title="Omhoog"
								>
									↑
								</button>
								<button
									type="button"
									onclick={() => moveIngredientDown(index)}
									disabled={index === ingredients.length - 1}
									class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
									title="Omlaag"
								>
									↓
								</button>
								<button
									type="button"
									onclick={() => removeIngredient(index)}
									class="px-2 py-1 text-red-500 hover:text-red-700"
									title="Verwijderen"
								>
									×
								</button>
							</div>
						</div>

						<!-- Alternative Ingredients Section -->
						{#if ingredient.ingredient.sqid}
							<details class="mt-3">
								<summary
									class="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1"
								>
									Alternatieven voor allergieën ({ingredient.ingredient_alternatives?.length || 0})
								</summary>
								<div class="mt-2 pl-4">
									<AlternativeIngredientsEditor
										alternatives={ingredient.ingredient_alternatives || []}
										{availableIngredients}
										{availableAllergies}
										onUpdate={(updated) => {
											ingredient.ingredient_alternatives = updated;
										}}
									/>
								</div>
							</details>
						{/if}
					</div>
				{/each}
			</div>

			<button
				type="button"
				onclick={addIngredient}
				class="mt-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm w-full"
			>
				+ Ingredient toevoegen
			</button>
		</div>

		<!-- Steps Section -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold mb-3">Bereidingsstappen</h3>

			<div class="space-y-2">
				{#each steps as step, index (step.tempId || step.sqid)}
					<div
						role="listitem"
						class="flex items-start gap-2 p-3 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors"
						class:opacity-50={draggedStepIndex === index}
					>
						<button
							type="button"
							draggable="true"
							ondragstart={() => handleStepDragStart(index)}
							ondragend={handleStepDragEnd}
							class="cursor-move px-2 py-1 text-gray-500 hover:text-gray-700"
							title="Sleep om te verplaatsen"
						>
							☰
						</button>

						<span
							class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-semibold min-w-[2rem] text-center"
						>
							{index + 1}
						</span>

						<div class="flex-1">
							<MarkdownEditor
								bind:value={step.instruction}
								onUpdate={(val) => (step.instruction = val)}
								placeholder="Beschrijf de bereidingsstap..."
							/>
						</div>

						<div class="flex flex-col gap-1">
							<button
								type="button"
								onclick={() => moveStepUp(index)}
								disabled={index === 0}
								class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
								title="Omhoog"
							>
								↑
							</button>
							<button
								type="button"
								onclick={() => moveStepDown(index)}
								disabled={index === steps.length - 1}
								class="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
								title="Omlaag"
							>
								↓
							</button>
							<button
								type="button"
								onclick={() => removeStep(index)}
								class="px-2 py-1 text-red-500 hover:text-red-700"
								title="Verwijderen"
							>
								×
							</button>
						</div>
					</div>
				{/each}
			</div>

			<button
				type="button"
				onclick={addStep}
				class="mt-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm w-full"
			>
				+ Stap toevoegen
			</button>
		</div>

		<!-- Notes Section -->
		<div class="mb-6">
			<h3 class="text-lg font-semibold mb-3">Notities</h3>

			<DraggableList items={notes} onReorder={(reordered) => (notes = reordered)}>
				{#snippet children(note: RecipeNoteOutSchema & { tempId?: string })}
					<div class="space-y-2">
						<div class="flex gap-2 items-center">
							<select
								bind:value={note.type}
								class="px-2 py-1 border border-gray-300 rounded text-sm"
							>
								<option value="info">Info</option>
								<option value="tip">Tip</option>
								<option value="warning">Waarschuwing</option>
							</select>
							<div
								class="px-2 py-1 rounded text-xs font-semibold"
								class:bg-blue-100={note.type === 'info'}
								class:text-blue-800={note.type === 'info'}
								class:bg-green-100={note.type === 'tip'}
								class:text-green-800={note.type === 'tip'}
								class:bg-orange-100={note.type === 'warning'}
								class:text-orange-800={note.type === 'warning'}
							>
								Preview kleur
							</div>
						</div>
						<MarkdownEditor
							bind:value={note.note}
							onUpdate={(val) => (note.note = val)}
							placeholder="Schrijf een notitie..."
						/>
					</div>
				{/snippet}
			</DraggableList>

			<button
				type="button"
				onclick={addNote}
				class="mt-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm w-full"
			>
				+ Notitie toevoegen
			</button>
		</div>

		<!-- Form Actions -->
		<div class="flex gap-3 justify-end pt-4 border-t">
			<button
				type="button"
				onclick={onCancel}
				class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
			>
				Annuleren
			</button>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Opslaan
			</button>
		</div>
	</form>
</div>

<!-- Ingredient Creation Modal -->
{#if showIngredientModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
			<IngredientForm
				title="Nieuw ingredient toevoegen"
				submitLabel="Toevoegen"
				{availableAllergies}
				onSave={handleCreateIngredient}
				onCancel={() => (showIngredientModal = false)}
			/>
		</div>
	</div>
{/if}
