<script setup lang="ts">
import LibEntry from '@/components/LibEntry.vue';
import { playlists } from '@/scripts/types';
import { Search } from '@lucide/vue';
</script>

<template>
    <aside class="h-full">
        <ul class="menu bg-base-200 rounded-box w-80 h-full">
            <li>
                <label class="input">
                    <Search />
                    <input type="text" placeholder="Search in your library" />
                </label>
            </li>
            <li v-for="songContainer in playlists">
                <LibEntry :song-container-handler="songContainer"></LibEntry>
            </li>
        </ul>
    </aside>
</template>
