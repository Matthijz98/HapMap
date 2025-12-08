<script lang="ts">
    import Search from "$lib/components/search/Search.svelte";
</script>

<div class="container mx-auto p-4">
    <h1 class="text-center text-white text-7xl font-bold mb-4">HapMap</h1>
    <Search recipe_count={123} />
    <p class="text-right text-white mb-4">
        <a href="/recepten">Of bekijk alle recepten op de receptenpagina --></a>
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg overflow-hidden sm:rounded-lg p-2">
            <h3>Nieuwste recepten</h3>
            <ul>

            </ul>
        </div>

        <div class="bg-white rounded-lg overflow-hidden sm:rounded-lg p-2">
            <h3></h3>
        </div>
    </div>
</div>
