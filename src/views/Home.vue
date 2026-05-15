<script setup lang="ts">
import HomeMain from '@/components/HomeMain.vue';
import HomeNav from '@/components/HomeNav.vue';
import PlayToolbar from '@/components/PlayToolbar.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { testSongSource } from '@/scripts/types';
</script>

<template>
    <BaseLayout>
        <div class="flex flex-col">
            <div class="flex flex-1">
                <HomeNav></HomeNav>
                <HomeMain></HomeMain>
            </div>
            <PlayToolbar :song-source="testSongSource"></PlayToolbar>
        </div>
    </BaseLayout>
</template>
