<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { BLANK_SONG_CONTAINER, type SelectEntrySignalDto } from '@/scripts/shared';
import { provide, ref } from 'vue';

const searchEntrySelected = ref<SelectEntrySignalDto>({ entry: BLANK_SONG_CONTAINER, songIdFocus: -1 });
provide('searchResultSelected', searchEntrySelected);
provide('appName', 'Music Play');
</script>

<template>
    <div class="main-container flex flex-col">
        <Header @entry-selected="(e) => searchEntrySelected = e"></Header>
        <main class="grow">
            <slot></slot>
        </main>
        <Footer></Footer>
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