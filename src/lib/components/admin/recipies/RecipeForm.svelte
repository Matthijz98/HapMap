<script lang="ts">
	import type {
		RecipeOutSchema,
		RecipeStepOutSchema,
		RecipeIngredientOutSchema,
		IngredientOutSchema,
		RecipeCategoryOutSchema,
		AllergyOutSchema
	} from '$lib/api/public-client/types.gen';
	import { recipesApiPrivateCreateIngredientMutation } from '$lib/api/private-client/@tanstack/svelte-query.gen';
	import { ingredientsApiGetAllergies } from '$lib/api/public-client/sdk.gen';
	import { createMutation } from '@tanstack/svelte-query';
	import AlternativeIngredientsEditor from './AlternativeIngredientsEditor.svelte';
	import FuzzyIngredientSearch from './FuzzyIngredientSearch.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';

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
	let newIngredientNameSingular = $state('');
	let newIngredientNamePlural = $state('');
	let newIngredientAllergySqids = $state<string[]>([]);
	let availableAllergies = $state<AllergyOutSchema[]>([]);

	// Load allergies on mount
	$effect(() => {
		loadAllergies();
	});

	async function loadAllergies() {
		try {
			const response = await ingredientsApiGetAllergies();
			if (response.data && Array.isArray(response.data)) {
				availableAllergies = response.data as AllergyOutSchema[];
			}
		} catch (error) {
			console.error('Failed to load allergies:', error);
		}
	}

	const createIngredientMutation = createMutation(() => ({
		...recipesApiPrivateCreateIngredientMutation(),
		onSuccess: (data: any) => {
			// Add the new ingredient to the available list
			if (data && data.sqid) {
				availableIngredients = [...availableIngredients, data];
			}
			// Reset modal
			showIngredientModal = false;
			newIngredientNameSingular = '';
			newIngredientNamePlural = '';
			newIngredientAllergySqids = [];
		}
	}));

	function handleCreateIngredient() {
		createIngredientMutation.mutate({
			body: {
				name_singular: newIngredientNameSingular,
				name_plural: newIngredientNamePlural,
				allergy_sqids: newIngredientAllergySqids
			}
		});
	}

	function toggleAllergy(sqid: string) {
		if (newIngredientAllergySqids.includes(sqid)) {
			newIngredientAllergySqids = newIngredientAllergySqids.filter((s) => s !== sqid);
		} else {
			newIngredientAllergySqids = [...newIngredientAllergySqids, sqid];
		}
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

	// Step drag handlers
	function handleStepDragStart(index: number) {
		draggedStepIndex = index;
	}

	function handleStepDragOver(event: DragEvent, index: number) {
		event.preventDefault();
		if (draggedStepIndex !== null && draggedStepIndex !== index) {
			steps = arrayMove(steps, draggedStepIndex, index).map((s, i) => ({ ...s, order: i }));
			draggedStepIndex = index;
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
				<select
					id="category"
					bind:value={selectedCategorySqid}
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">Selecteer een categorie</option>
					{#each availableCategories as category (category.sqid)}
						<option value={category.sqid}>{category.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="short_description" class="block text-sm font-medium text-gray-700 mb-1"
					>Beschrijving *</label
				>
				<MarkdownEditor
					bind:value={short_description}
					onUpdate={(val) => (short_description = val)}
					placeholder="Beschrijf het recept..."
					mode="description"
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
								step="0.01"
								placeholder="Aantal"
								class="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
							/>

							<select
								bind:value={ingredient.unit}
								class="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
							>
								<option value="gr">Gram</option>
								<option value="ml">Milliliter</option>
								<option value="peaces">Piece</option>
								<option value="cloves">Clove</option>
								<option value="head">Head</option>
							</select>

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
						ondragover={(e) => handleStepDragOver(e, index)}
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
			<h3 class="text-xl font-bold mb-4">Nieuw Ingredient Toevoegen</h3>

			<div class="space-y-4">
				<div>
					<label for="name_singular" class="block text-sm font-medium text-gray-700 mb-1">
						Enkelvoud *
					</label>
					<input
						id="name_singular"
						type="text"
						bind:value={newIngredientNameSingular}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="bijv. ui"
					/>
				</div>

				<div>
					<label for="name_plural" class="block text-sm font-medium text-gray-700 mb-1">
						Meervoud *
					</label>
					<input
						id="name_plural"
						type="text"
						bind:value={newIngredientNamePlural}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="bijv. uien"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Allergieën</label>
					<div class="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-2">
						{#each availableAllergies as allergy (allergy.sqid)}
							<label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
								<input
									type="checkbox"
									checked={newIngredientAllergySqids.includes(allergy.sqid)}
									onchange={() => toggleAllergy(allergy.sqid)}
									class="rounded"
								/>
								<span class="text-sm">{allergy.name}</span>
							</label>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex gap-3 justify-end mt-6">
				<button
					type="button"
					onclick={() => {
						showIngredientModal = false;
						newIngredientNameSingular = '';
						newIngredientNamePlural = '';
						newIngredientAllergySqids = [];
					}}
					class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
				>
					Annuleren
				</button>
				<button
					type="button"
					onclick={handleCreateIngredient}
					disabled={!newIngredientNameSingular || !newIngredientNamePlural}
					class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Toevoegen
				</button>
			</div>
		</div>
	</div>
{/if}
