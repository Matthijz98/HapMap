<script lang="ts">
import Search from "$lib/components/public/search/Search.svelte";
</script>

<nav class="bg-white shadow flex items-center justify-between p-2">
    <div>
        <a href="/" class="text-xl font-bold text-gray-800">
            HapMap
            <img src="/logo.png" alt="HapMap Logo" class="w-6 h-6 inline-block ml-1" />
        </a>
    </div>
    <div class="flex gap-4">
        <a href="/recepten" class="text-gray-600 hover:text-gray-800">Recepten</a>
        <a href="/over" class="text-gray-600 hover:text-gray-800">Over</a>
    </div>
    <div class="max-w-56">
        <Search />
    </div>
</nav>