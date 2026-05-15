<script setup lang="ts">
import type { SongContainerHandler } from '@/scripts/types';

const props = defineProps<{
    songContainerHandler: SongContainerHandler
}>();
</script>

<template>
    <div class="navbar-start flex items-center gap-2 w-full" @click="songContainerHandler.goTo()">
        <img class="h-8 ml-4" :src="songContainerHandler.getSongContainer().coverPath" />
        <div class="flex flex-col">
            <strong>{{ songContainerHandler.getSongContainer().name }}</strong>
            <span>{{ songContainerHandler.getType() }}</span>
        </div>
    </div>
</template>

<style scoped></style>
