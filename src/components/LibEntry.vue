<script setup lang="ts">
import { navigatorService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';

const props = defineProps<{
    songContainer: SongContainer
    
}>();
</script>

<template>
    <figure class="flex items-center gap-2 w-full" @click="navigatorService.goTo(songContainer)">
        <img class="h-8 ml-4" :src="songContainer.coverPath" />
        <figcaption class="flex flex-col">
            <strong>{{ songContainer.type.name }}</strong>
            <span>{{ songContainer.typeName }}</span>
        </figcaption>
    </figure>
</template>
