<script setup lang="ts">
import type { CreatePlaylistRequest, EditPLaylistRequest } from '@/scripts/api';
import { musicPlayService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';
import { CircleX, FolderPen, Save } from '@lucide/vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    type: 'create' | 'edit'
    id: string
    playlistToEdit?: SongContainer
}>();

const emit = defineEmits({
    onPlaylistCreated(e: SongContainer) { },
    onPlaylistEdited(e: SongContainer) { },
});

const formId = props.id.concat('-form');
const formInputFileId = props.id.concat('-file-input');

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

    const createdPlaylist = await musicPlayService.createPlaylist(request);
    emit('onPlaylistCreated', createdPlaylist);

    // TODO: add validations here then close
    eval(`document.querySelector('#${props.id}').close();`);
    cleanUp();
}

async function editPlaylist() {
    if (!props.playlistToEdit) {
        return;
    }

    let request: EditPLaylistRequest = {
        playlistId: props.playlistToEdit.type.id as number,
        newName: enteredPlaylistName.value
    };

    if (enteringCoverImg.value) {
        request.file = enteredCoverImg.value.pathData;
    }

    const editedPlaylist = await musicPlayService.editPlaylist(request);
    emit('onPlaylistEdited', editedPlaylist);

    // TODO: add validations here then close
    eval(`document.querySelector('#${props.id}').close();`);
    cleanUp();
}

function cleanUp() {
    enteredPlaylistName.value = '';
    enteringCoverImg.value = false;
}
</script>

<template>
    <dialog :id="id" class="modal">

        <div class="modal-box bg-base-300 text-base-content">
            <h3 class="text-lg">
                <strong v-if="type === 'create'">Create Playlist</strong>
                <strong v-else>Edit Playlist</strong>
            </h3>
            <div class="divider"></div>

            <form @submit.prevent="type === 'create' ? createPlaylist() : editPlaylist()" :id="formId"
                class="flex flex-col gap-2">
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
                    <span v-if="type === 'create'">Create</span>
                    <span v-else>Edit</span>
                </button>
                <button class="btn btn-base" @click="cleanUp()">
                    <CircleX />
                    <span>Cancel</span>
                </button>
            </form>
        </div>

    </dialog>
</template>