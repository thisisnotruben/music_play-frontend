<script setup lang="ts">
import HomeMain from '@/components/home/HomeMain.vue';
import HomeNav from '@/components/home/HomeNav.vue';
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { BLANK_SONG_CONTAINER, SongContainer } from '@/scripts/shared';
import { ref, Suspense, useTemplateRef } from 'vue';

const deletePlaylist = ref(BLANK_SONG_CONTAINER);
const editedPlaylist = ref(BLANK_SONG_CONTAINER);

const homeMain = useTemplateRef('home-main');
function goToEntry(focusOnEntry: SongContainer) {
    homeMain.value?.setEntry(focusOnEntry);
}
</script>

<template>
    <ToolbarLayout>

        <Suspense>
            <template #default>
                <HomeNav :playlist-to-delete="deletePlaylist" :playlist-edited="editedPlaylist"
                    @entry-selected="(e) => goToEntry(e)">
                </HomeNav>
            </template>
        </Suspense>
        <HomeMain @on-playlist-deleted="(p) => deletePlaylist = p" @on-playlist-edited="(e) => editedPlaylist = e"
            ref="home-main"></HomeMain>

    </ToolbarLayout>
</template>
