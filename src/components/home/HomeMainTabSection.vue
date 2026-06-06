<script setup lang="ts">
import { musicPlayService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';
import LibCard from '../LibCard.vue';

const props = defineProps<{
    type: 'explore' | 'all'
}>();

const emit = defineEmits({
    entrySelected(e: SongContainer) { },
});

const sections = props.type === 'all'
    ? await musicPlayService.getArtists()
    : await musicPlayService.getExploreFeed();
</script>

<template>
    <!-- HACK: h-192, need to find a way to expand until footer toolbar -->
    <ul class="list overflow-auto h-180">
        <template v-for="[title, entries] in sections">
            <template v-if="entries.length > 0">

                <li class="list-row flex flex-col">

                    <div class="flex items-center gap-2">
                        <h3 class="underline underline-offset-8 text-lg">
                            <strong>{{ title }}</strong>
                        </h3>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <LibCard v-for="entry in entries" :song-container="entry" :skeleton="false"
                            @entry-selected="(e) => $emit('entrySelected', e)">
                        </LibCard>
                    </div>

                </li>

            </template>
        </template>
    </ul>
</template>
