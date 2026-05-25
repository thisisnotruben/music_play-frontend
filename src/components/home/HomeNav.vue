<script setup lang="ts">
import LibEntry from '@/components/LibEntry.vue';
import { musicPlayService } from '@/scripts/service';
import { Search } from '@lucide/vue';

const playlists = await musicPlayService.getPlaylists();
</script>

<template>
    <aside class="bg-base-200 text-base-content ">
        <ul class="menu rounded-box w-full">
            <li>
                <label class="input">
                    <Search />
                    <input type="text" placeholder="Search in your library" />
                </label>
            </li>
            <li v-for="songContainer in playlists">
                <LibEntry :song-container="songContainer"></LibEntry>
            </li>
        </ul>
    </aside>
</template>
