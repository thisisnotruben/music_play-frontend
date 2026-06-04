<script setup lang="ts">
import LibEntry from '@/components/LibEntry.vue';
import { type CreatePlaylistRequest, type PlaylistDto } from '@/scripts/api';
import { musicPlayService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';
import { CirclePlus, CircleX, FolderPen, Save, Search } from '@lucide/vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    playlistToDelete: SongContainer
}>();

const emit = defineEmits({
    entrySelected(entry: SongContainer) { },
});

const playlists = ref(await musicPlayService.getPlaylists());

const formId = 'home-nav-dialog-form';
const formInputFileId = formId.concat('-file-input');

const enteredPlaylistName = ref('');
const enteringCoverImg = ref(false);
const enteredCoverImg = ref({ path: '', pathData: new Blob() });

watch(enteringCoverImg, (value) => {
    if (!value) {
        (document.querySelector('#'.concat(formInputFileId)) as HTMLInputElement).value = '';
        enteredCoverImg.value.path = '';
    }
})

function onFileSelected(e: Event) {
    let files = (e.target as HTMLInputElement).files
    if (files instanceof FileList && files.length > 0) {

        let file = files[0] as File;
        enteredCoverImg.value.path = URL.createObjectURL(file);
        enteredCoverImg.value.pathData = file;
    }
}

async function createPlaylist() {
    let request: CreatePlaylistRequest = { playlistName: enteredPlaylistName.value }
    if (enteringCoverImg.value) {
        request.file = enteredCoverImg.value.pathData;
    }

    playlists.value.push(await musicPlayService.createPlaylist(request));
    // TODO: add validations here then close
    eval("document.querySelector('#home_nav_dialog').close();");
    cleanUp();
}

function cleanUp() {
    enteredPlaylistName.value = '';
    enteringCoverImg.value = false;
}

function deletePlaylist(songContainer: SongContainer) {
    playlists.value = playlists.value.filter((p) => (songContainer.type as PlaylistDto).id != (p.type as PlaylistDto).id);
}

watch(props, (value) => deletePlaylist(value.playlistToDelete));
</script>

<template>
    <!-- NOTICE: max-width here effects the max-width of LibCard -->
    <aside class="bg-base-200 text-base-content w-96 max-w-80">
        <ul class="menu gap-2 w-full">
            <li>
                <button class="btn btn-base w-full" onclick="home_nav_dialog.showModal()">
                    <CirclePlus />
                    Create Playlist
                </button>
            </li>
            <li>
                <label class="input">
                    <Search />
                    <input class="w-full" type="text" placeholder="Search in your library" />
                </label>
            </li>
            <li v-for="songContainer in playlists">
                <LibEntry :song-container="songContainer" @entry-selected="e => $emit('entrySelected', e)"></LibEntry>
            </li>
        </ul>
    </aside>

    <dialog id="home_nav_dialog" class="modal">

        <div class="modal-box bg-base-300 text-base-content">
            <h3 class="text-lg">
                <strong>Create Playlist</strong>
            </h3>
            <div class="divider"></div>

            <form @submit.prevent="createPlaylist()" :id="formId" class="flex flex-col gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Playlist name</legend>
                    <label class="input w-full">
                        <FolderPen />
                        <input type="text" placeholder="Enter playlist name" v-model="enteredPlaylistName" />
                    </label>
                </fieldset>

                <fieldset class="fieldset flex flex-col gap-2">
                    <legend class="fieldset-legend">
                        Upload playlist cover
                    </legend>

                    <input type="checkbox" class="toggle" v-model="enteringCoverImg" />
                    <div class="flex flex-col gap-2" :class="{ 'invisible': !enteringCoverImg }">
                        <input :id="formInputFileId" type="file" accept="image/*" class="file-input w-full"
                            @change="(e) => onFileSelected(e)" />
                        <img :src="enteredCoverImg.path" class="w-16 h-16 ml-4"
                            :class="{ 'invisible': enteredCoverImg.path.length == 0 }" />
                    </div>

                </fieldset>
            </form>

            <form class="modal-action mt-4" method="dialog">
                <button class="btn btn-neutral" type="submit" :form="formId">
                    <Save />
                    Create
                </button>
                <button class="btn btn-base" @click="cleanUp()">
                    <CircleX />
                    Cancel
                </button>
            </form>
        </div>

    </dialog>

</template>
