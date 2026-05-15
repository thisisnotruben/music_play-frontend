<script setup lang="ts">
import type { SongContainerHandler } from '@/scripts/types';
import { playlists } from '@/scripts/types';
import LibCard from './LibCard.vue';

const sections = new Map<string, SongContainerHandler[]>();
sections.set('Jump back in', playlists);
sections.set('Your favorite artists', playlists);
sections.set('Most played song', playlists);
sections.set('Recommended', playlists);
</script>

<template>
    <div class="mt-3 p-6 overflow-auto max-h-192 w-full">
        <h2 class="text-xl mb-4"><strong>Explore</strong></h2>

        <div class="flex flex-col gap-8">

            <template v-for="[title, entries] in sections">
                <template v-if="entries.length > 0">

                    <section>
                        <h3 class="mb-1">{{ title }}</h3>
                        <div class="flex gap-2">
                            <LibCard v-for="entry in entries" :song-container-handler="entry">
                            </LibCard>
                        </div>
                    </section>

                </template>
            </template>

        </div>

    </div>
</template>

<style scoped></style>
