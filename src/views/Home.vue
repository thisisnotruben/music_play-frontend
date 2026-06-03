<script setup lang="ts">
import HomeMain from '@/components/home/HomeMain.vue';
import HomeNav from '@/components/home/HomeNav.vue';
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { BLANK_SONG_CONTAINER } from '@/scripts/shared';
import { ref, Suspense } from 'vue';

const focusOnEntry = ref(BLANK_SONG_CONTAINER);
</script>

<template>
    <ToolbarLayout>

        <Suspense>
            <template #default>
                <HomeNav @entry-selected="(e) => focusOnEntry = e"></HomeNav>
            </template>
        </Suspense>
        <HomeMain :song-container="focusOnEntry"></HomeMain>

    </ToolbarLayout>
</template>
