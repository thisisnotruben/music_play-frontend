<script setup lang="ts">
import type { Song } from '@/scripts/types';
import { Play } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps<{
    song: Song
}>();

const onHover = ref(false);

</script>

<template>
    <div class="card" @mouseover="onHover = true" @mouseout="onHover = false">

        <figure>
            <img :src="song.coverPath" />
            <figcaption>{{ song.name }}</figcaption>
        </figure>

        <button v-show="onHover" class="btn btn-circle">
            <Play />
        </button>

    </div>
</template>

<style scoped></style>
