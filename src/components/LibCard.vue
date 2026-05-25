<script setup lang="ts">
import type { SongContainer } from '@/scripts/shared';
import { Play } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps<{
    songContainer: SongContainer
    skeleton: boolean
}>();

const emit = defineEmits({
    entrySelected(entry: SongContainer) { },
});

const onHover = ref(false);
</script>

<template>
    <figure class="max-w-32" @mouseover="onHover = true" @mouseout="onHover = false">

        <div class="relative mb-1">

            <template v-if="skeleton">
                <div class="w-32 h-32 bg-base-300"></div>
            </template>

            <template v-else>
                <img class="min-w-32 max-w-32" :src="songContainer.coverPath"
                    @click="$emit('entrySelected', songContainer)" />
                <button class="btn btn-neutral btn-circle absolute right-1 bottom-1" v-show="onHover"
                    @click="$emit('entrySelected', songContainer)">
                    <Play />
                </button>
            </template>

        </div>

        <template v-if="skeleton">
            <div class="flex flex-col gap-2">
                <div class="bg-base-300 w-24 h-4"></div>
                <div class="bg-base-300 w-32 h-4"></div>
            </div>
        </template>

        <template v-else>
            <figcaption class="text-wrap text-base" :class="{ 'bg-base-300': skeleton }">
                {{ songContainer.type.name }}
            </figcaption>
        </template>

    </figure>
</template>
