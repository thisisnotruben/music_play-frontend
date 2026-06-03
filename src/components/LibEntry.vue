<script setup lang="ts">
import { navigatorService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';

const props = defineProps<{
    songContainer: SongContainer
}>();

const emit = defineEmits({
    entrySelected(entry: SongContainer) { },
});
</script>

<template>
    <figure class="flex items-center gap-2 w-full" @click="$emit('entrySelected', songContainer)">

        <img v-if="songContainer.coverPath.length > 0" class="w-12 ml-4" :src="songContainer.coverPath" />

        <figcaption class="flex flex-col">
            <strong class="truncate max-w-48">{{ songContainer.type.name }}</strong>
            <span>{{ songContainer.typeName }}</span>
        </figcaption>
    </figure>
</template>
