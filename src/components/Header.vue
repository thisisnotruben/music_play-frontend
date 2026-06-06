<script setup lang="ts">
import type { SongDto } from '@/scripts/api/index.ts';
import { musicPlayService, searchService } from '@/scripts/service.ts';
import { SongContainer, SongContainerTypes, type SelectEntrySignalDto } from '@/scripts/shared';
import { ArrowBigDownDash, AudioWaveform, House, Info, Keyboard, LogOut, Search, SquareUser, User, X } from '@lucide/vue';
import { useKeyModifier, useMagicKeys, watchDebounced } from '@vueuse/core';
import { inject, ref, useTemplateRef, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LibEntry from './LibEntry.vue';

const appName = inject('appName');

const emit = defineEmits({
    entrySelected(selection: SelectEntrySignalDto) { },
});

const router = useRouter();
const route = useRoute();
const isLogined = !['index', 'login', 'createAccount'].includes(route.name?.toString() ?? '');

function logout() {
    router.push({ name: 'login' });
}

const ctrlMod = useKeyModifier('Control');
const { k, escape } = useMagicKeys();
const showPopupSearch = ref(false);
const popupSeachEntry = useTemplateRef('popup-seach-entry');
watchEffect(() => {
    if (ctrlMod.value && k?.value) {
        showPopupSearch.value = true;
        popupSeachEntry.value?.focus();
    } else if (escape?.value) {
        showPopupSearch.value = false;
    }
});

document.onkeydown = function (e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
    }
};

const searchText = ref('');
const searchFilters = ref<string[]>([]);
const searchResults = ref<SongContainer[]>([]);
async function search() {
    searchResults.value = await searchService.getSearch({ query: searchText.value, filter: searchFilters.value });
}
watchDebounced(searchText, () => search(), { debounce: 500, maxWait: 1000 });
watch(searchFilters, () => search());

async function onEntryResultSelected(e: SongContainer) {
    showPopupSearch.value = false;
    let selection: SelectEntrySignalDto = { entry: e, songIdFocus: -1 }

    if (e.typeName == SongContainerTypes.SONG) {
        const song = e.type as SongDto;
        selection = {
            entry: await musicPlayService.getAlbum({ albumId: song.albumId as number }),
            songIdFocus: song.id as number
        }
    }
    emit('entrySelected', selection);
}
</script>

<template>
    <header class="navbar bg-neutral">

        <div class="navbar-start gap-2 text-neutral-content">
            <AudioWaveform />
            <h1 class="text-lg">{{ appName }}</h1>
        </div>

        <template v-if="isLogined">

            <div class="navbar-center gap-2">
                <button class="btn btn-circle" @click="$router.push({ name: 'home' })">
                    <House />
                </button>
                <label class="input">
                    <Search />
                    <input type="text" placeholder="What do you want to play?" class="w-64" />
                    <span class="flex items-center gap-2 text-sm">
                        Ctrl-K
                        <button class="btn btn-circle btn-ghost btn-sm" @click="showPopupSearch = true">
                            <Keyboard />
                        </button>
                    </span>
                </label>
            </div>

            <div class="navbar-end">
                <div class="dropdown dropdown-end">

                    <button tabindex="0" role="button" class="btn btn-circle">
                        <SquareUser />
                    </button>

                    <ul tabindex="-1" class="menu dropdown-content bg-base-300">
                        <li>
                            <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'home' })">
                                <House />
                                <span>Home</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'account' })">
                                <User />
                                <span>Account</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'about' })">
                                <Info />
                                <span>About</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost justify-between" onclick="logout_model.showModal()">
                                <LogOut />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </template>

    </header>

    <dialog id="search_model" class="modal" :class="{ 'modal-open': showPopupSearch }">
        <div class="modal-box w-192 bg-base-300 text-base-content flex flex-col gap-2">

            <label class="input w-full">
                <Search />
                <input type="text" placeholder="What do you want to play?" v-model="searchText"
                    ref="popup-seach-entry" />
            </label>

            <form class="flex justify-end gap-1">
                <input class="btn btn-base" type="checkbox" aria-label="Album" value="album" v-model="searchFilters" />
                <input class="btn btn-base" type="checkbox" aria-label="Song" value="song" v-model="searchFilters" />
                <button class="btn btn-base" type="reset" @click="searchFilters = []">
                    <X />
                </button>
            </form>
            <div class="divider"></div>
            <ul class="menu w-full">
                <li v-for="value in searchResults" :key="value.type.id">
                    <LibEntry :song-container="value" :is-search-result="true"
                        @entry-selected="(e) => onEntryResultSelected(e)"></LibEntry>
                </li>
            </ul>

        </div>
        <form method="dialog" class="modal-backdrop">

        </form>
    </dialog>

    <dialog id="logout_model" class="modal">
        <div class="modal-box w-80 bg-base-300 text-base-content">
            <h3 class="text-center underline underline-offset-8 text-lg">
                <strong>Logout?</strong>
            </h3>
            <form class="modal-action" method="dialog">
                <button class="btn btn-secondary w-32" @click="logout()">
                    <LogOut />
                    <span>Leave</span>
                </button>
                <button class="btn btn-primary w-32">
                    <ArrowBigDownDash />
                    <span>Stay</span>
                </button>
            </form>
        </div>
    </dialog>

</template>