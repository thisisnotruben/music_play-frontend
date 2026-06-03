<script setup lang="ts">
import { SongContainer } from '@/scripts/shared';
import { useCountdown } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps<{
    songContainer: SongContainer
}>();

const emit = defineEmits({
    entrySelected(e: SongContainer) { },
});

// NOTICE: used for creating playlists where the image isn't instantly available.
const imgPath = ref(props.songContainer.coverPath);
function onErrorLoadingImg() {
    useCountdown(0.25, {
        onComplete() {
            imgPath.value = props.songContainer.coverPath;
        }
    });
}
</script>

<template>
    <figure class="flex items-center gap-2 w-full" @click="$emit('entrySelected', songContainer)">

        <img v-if="imgPath.length > 0" class="w-12 ml-4" :src="imgPath" :onerror="onErrorLoadingImg()" />

        <figcaption class="flex flex-col">
            <strong class="truncate max-w-48">{{ songContainer.type.name }}</strong>
            <span>{{ songContainer.typeName }}</span>
        </figcaption>
    </figure>
</template>
