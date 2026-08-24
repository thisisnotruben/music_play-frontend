<script setup lang="ts">
import Header from '@/components/Header.vue';
import { BLANK_SONG, BLANK_SONG_CONTAINER, type SelectEntrySignalDto } from '@/scripts/shared';
import { provide, ref } from 'vue';

const searchEntrySelected = ref<SelectEntrySignalDto>({ entry: BLANK_SONG_CONTAINER, songFocus: BLANK_SONG });
provide('searchResultSelected', searchEntrySelected);
provide('appName', 'Music Play');
</script>

<template>
    <div class="main-container flex flex-col">
        <Header @entry-selected="(e) => searchEntrySelected = e"></Header>
        <main class="grow">
            <slot></slot>
        </main>
    </div>
</template>

<style>
body {
    height: 100vh;
}

#app,
.main-container {
    height: inherit;
}

main>*:first-child {
    height: -webkit-fill-available;
}
</style>