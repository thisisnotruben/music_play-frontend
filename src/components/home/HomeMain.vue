<script setup lang="ts">
import { SongContainer } from '@/scripts/shared';
import { Folder, FolderOpen, Telescope } from '@lucide/vue';
import { ref, Suspense, watch } from 'vue';
import HomeMainTabSection from './HomeMainTabSection.vue';
import HomeMainTabSectionSkeleton from './HomeMainTabSectionSkeleton.vue';
import SongList from './SongList.vue';

const props = defineProps<{
    songContainer: SongContainer
}>();

const entryFocusedLabel = ref('');
const entry = ref(props.songContainer);
const entryFocused = ref(false);
const goToEntryFocusTab = ref(false);
function setEntry(songContainer: SongContainer) {
    entryFocusedLabel.value = songContainer.type?.name ?? '';
    entry.value = songContainer;

    let isFocused = !songContainer.isEmpty();
    entryFocused.value = isFocused;
    goToEntryFocusTab.value = isFocused;
}

watch(props, (p) => setEntry(p.songContainer))
</script>

<template>
    <div class="w-full bg-base-200">
        <section class="tabs tabs-box pt-2">

            <label class="tab gap-2 ">
                <input type="radio" name="my_tabs_2" checked @click="goToEntryFocusTab = false" />
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
                <SongList class="h-192" :song-container="entry"></SongList>
            </div>

        </section>
    </div>
</template>
