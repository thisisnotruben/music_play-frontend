<script setup lang="ts">
import type { SongContainerHandler } from '@/scripts/types';
import { Play } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps<{
    songContainerHandler: SongContainerHandler
}>();

const onHover = ref(false);

</script>

<template>
    <figure @mouseover="onHover = true" @mouseout="onHover = false">

        <div class="relative">
            <img class="w-32" :src="songContainerHandler.getSongContainer().coverPath" />
            <button v-show="onHover" class="btn btn-circle absolute right-1 bottom-1">
                <Play />
            </button>
        </div>
        <figcaption>
            {{ songContainerHandler.getSongContainer().name }}
        </figcaption>


    </figure>
</template>

<style scoped></style>
