<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import RecipesList from '$lib/components/admin/recipies/RecipesList.svelte';
	import { recipesApiPrivateDeletePrivateRecipeMutation } from '$lib/api/private-client/@tanstack/svelte-query.gen';

	const queryClient = useQueryClient();

	const deleteMutationObj = createMutation(() => ({
		...recipesApiPrivateDeletePrivateRecipeMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		}
	}));

	function handleDelete(sqid: string) {
		deleteMutationObj.mutate({ path: { sqid } });
	}
</script>

<div class="container mx-auto p-6">
	<RecipesList onDelete={handleDelete} />
</div>