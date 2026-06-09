<script setup lang="ts">
import { playerService } from '@/scripts/service.ts';
import { BLANK_SONG, BLANK_SONG_CONTAINER, SongContainer, type SelectEntrySignalDto } from '@/scripts/shared';
import { Folder, FolderOpen, Telescope } from '@lucide/vue';
import { inject, ref, Suspense, useTemplateRef, watch } from 'vue';
import HomeMainTabSection from './HomeMainTabSection.vue';
import HomeMainTabSectionSkeleton from './HomeMainTabSectionSkeleton.vue';
import SongList from './SongList.vue';

const emit = defineEmits({
    onPlaylistDeleted(p: SongContainer) { },
    onPlaylistEdited(p: SongContainer) { },
});

const entryFocusedLabel = ref('');
const entry = ref(BLANK_SONG_CONTAINER);
const entryFocused = ref(false);
const goToEntryFocusTab = ref(false);
function setEntry(songContainer: SongContainer) {
    entryFocusedLabel.value = songContainer.type?.name ?? '';
    entry.value = songContainer;

    let isFocused = !songContainer.isEmpty();
    entryFocused.value = isFocused;
    goToEntryFocusTab.value = isFocused;
}

const exploreTab = useTemplateRef('explore-tab');
function onPlaylistDeletedReceived(p: SongContainer) {
    setEntry(BLANK_SONG_CONTAINER);
    if (exploreTab.value) {
        exploreTab.value.checked = true;
    }
    emit('onPlaylistDeleted', p);
}

const searchSelected = inject('searchResultSelected', ref<SelectEntrySignalDto>({ entry: BLANK_SONG_CONTAINER, songFocus: BLANK_SONG }));
watch(searchSelected, async (value) => {
    setEntry(value.entry);
    if (value.songFocus != BLANK_SONG) {
        await playerService.play(value.songFocus, value.entry);
    }
});

defineExpose({ setEntry });
</script>

<template>
    <div class="w-full bg-base-200">
        <section class="tabs tabs-box pt-2">

            <label class="tab gap-2 ">
                <input type="radio" name="my_tabs_2" checked @click="goToEntryFocusTab = false" ref="explore-tab" />
                <Telescope />
                <span>Explore</span>
            </label>
            <div class="tab-content">
                <Suspense>
                    <template #default>
                        <HomeMainTabSection type="all" @entry-selected="(e) => setEntry(e)">
                        </HomeMainTabSection>
                    </template>
                    <template #fallback>
                        <HomeMainTabSectionSkeleton></HomeMainTabSectionSkeleton>
                    </template>
                </Suspense>
            </div>

            <label class="tab gap-2">
                <input type="radio" name="my_tabs_2" @click="goToEntryFocusTab = false" />
                <Folder />
                <span>All Music</span>
            </label>
            <div class="tab-content">
                <Suspense>
                    <template #default>
                        <HomeMainTabSection type="all" @entry-selected="(e) => setEntry(e)">
                        </HomeMainTabSection>
                    </template>
                    <template #fallback>
                        <HomeMainTabSectionSkeleton></HomeMainTabSectionSkeleton>
                    </template>
                </Suspense>
            </div>

            <label class="tab gap-2" v-show="entryFocused">
                <input type="radio" name="my_tabs_2" :checked="entryFocused && goToEntryFocusTab" />
                <FolderOpen />
                <span>{{ entryFocusedLabel }}</span>
            </label>
            <div class="tab-content">
                <SongList class="h-192" :song-container="entry"
                    @on-playlist-deleted="(p) => onPlaylistDeletedReceived(p)"
                    @on-playlist-edited="(p) => $emit('onPlaylistEdited', p)">
                </SongList>
            </div>

        </section>
    </div>
</template>
