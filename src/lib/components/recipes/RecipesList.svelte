<script>
    let {recipesQuery = $bindable()} = $props()
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
    {#if recipesQuery.isLoading}
        <p>Recepten aan het laden...</p>
    {:else if recipesQuery.isError}
        <p>Fout bij het laden van de recepten.</p>
    {:else if recipesQuery.data}
        {#each recipesQuery.data as recipe}
            <li class="bg-white rounded-lg overflow-hidden sm:rounded-lg p-2">
                <h3 class="text-2xl font-bold">
                    <a href={`/recepten/${recipe.name}-${recipe.sqid}`} class="hover:underline">
                        {recipe.name}
                    </a>
                </h3>
                <span>
                                {recipe.short_description}
                            </span>
                <div class="flex gap-2">
                    <span>Bevat allergie:</span>
                    {#each recipe.includes_allergies as allergy}
                                    <span class="bg-blue-200 text-blue-800 text-xs font-semibold px-1 py-0.5 rounded">
                                        {allergy.name}
                                    </span>
                    {/each}
                </div>
                <hr class="border-gray-400 my-2"/>
                <div class="flex gap-2 justify-between">
                    <span>Gemaakt op: {new Date(recipe.created_at).toLocaleDateString()}</span>
                    <span>Van: <a href={`/gebruikers/${recipe.created_by.username}`}>{recipe.created_by.username}</a></span>
                </div>
            </li>
        {/each}
    {/if}
</div>