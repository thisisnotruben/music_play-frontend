<script setup lang="ts">
import LibEntry from '@/components/LibEntry.vue';
import PlayToolbar from '@/components/PlayToolbar.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { playlists, testSongSource } from '@/scripts/types';
import { Search, X } from '@lucide/vue';
</script>

<template>
    <BaseLayout>
        <div class="flex flex-col">
            <div class="flex-1">
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

                <div>

                </div>
            </div>
            <PlayToolbar :song-source="testSongSource"></PlayToolbar>
        </div>
    </BaseLayout>
</template>

<style scoped></style>
