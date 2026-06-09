<script setup lang="ts">
import type { SongDto } from '@/scripts/api/index.ts';
import { musicPlayService, searchService } from '@/scripts/service';
import { BLANK_SONG, SongContainerTypes, type SelectEntrySignalDto, type SongContainer } from '@/scripts/shared';
import { Search, X } from '@lucide/vue';
import { useKeyModifier, useMagicKeys, watchDebounced } from '@vueuse/core';
import { ref, useTemplateRef, watch, watchEffect } from 'vue';
import LibEntry from './LibEntry.vue';

const props = defineProps<{
    id: string
    onlySongs: boolean
    canKeyboardShortcut: boolean
}>();

const emit = defineEmits({
    entrySelected(selection: SelectEntrySignalDto) { },
    addSongToPlaylist(s: SongContainer) { },
});

const searchText = ref('');
const searchFilters = ref<string[]>([]);
const searchResults = ref<SongContainer[]>([]);
async function search() {
    searchResults.value = await searchService.getSearch(
        { query: searchText.value, filter: props.onlySongs ? ['song'] : searchFilters.value });
}
watchDebounced(searchText, () => search(), { debounce: 500, maxWait: 1000 });
watch(searchFilters, () => search());

const ctrlMod = useKeyModifier('Control');
const { k, escape } = useMagicKeys();
const popupSeachEntry = useTemplateRef('popup-seach-entry');
watchEffect(() => {
    if (!props.canKeyboardShortcut) {
        return;
    }
    if (ctrlMod.value && k?.value) {
        dialogVisibility(true);
        popupSeachEntry.value?.focus();
    } else if (escape?.value) {
        dialogVisibility(false);
    }
});

document.onkeydown = function (e: KeyboardEvent) {
    if (props.canKeyboardShortcut && e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
    }
};

async function onEntryResultSelected(e: SongContainer) {
    if (props.onlySongs) {
        return;
    }

    dialogVisibility(false);
    let selection: SelectEntrySignalDto = { entry: e, songFocus: BLANK_SONG }

    if (e.typeName == SongContainerTypes.SONG) {
        const song = e.type as SongDto;
        selection = {
            entry: await musicPlayService.getAlbum({ albumId: song.albumId as number }),
            songFocus: song
        }
    }
    emit('entrySelected', selection);
}

function dialogVisibility(show: boolean) {
    const method = show ? 'showModal();' : 'close();';
    eval(`document.querySelector('#${props.id}').${method}`);
}

function addSongToPlaylist(e: SongContainer) {
    dialogVisibility(false);
    emit('addSongToPlaylist', e);
}
</script>

<template>
    <dialog :id="id" class="modal">
        <div class="modal-box w-192 bg-base-300 text-base-content flex flex-col gap-2">

            <label class="input w-full">
                <Search />
                <input type="text" placeholder="What do you want to play?" v-model="searchText"
                    ref="popup-seach-entry" />
            </label>

            <form v-if="!onlySongs" class="flex justify-end gap-1">
                <input class="btn btn-base" type="checkbox" aria-label="Album" value="album" v-model="searchFilters" />
                <input class="btn btn-base" type="checkbox" aria-label="Song" value="song" v-model="searchFilters" />
                <button class="btn btn-base" type="reset" @click="searchFilters = []">
                    <X />
                </button>
            </form>

            <div class="divider"></div>

            <ul class="menu w-full">
                <li v-for="value in searchResults" :key="value.type.id">
                    <LibEntry :song-container="value" :is-search-result="true" :is-search-result-add-song="onlySongs"
                        @entry-selected="(e) => onEntryResultSelected(e)"
                        @add-song-to-playlist="(e) => addSongToPlaylist(e)"></LibEntry>
                </li>
            </ul>

        </div>

        <form method="dialog" class="modal-backdrop"></form>

    </dialog>
</template>