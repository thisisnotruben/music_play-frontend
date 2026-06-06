<script setup lang="ts">
import { SongDtoFromJSON, type AlbumDto, type PlaylistDto } from '@/scripts/api';
import { formatPlaybackTime } from '@/scripts/helper';
import { musicPlayService, playerService } from '@/scripts/service';
import { BLANK_SONG_CONTAINER, SongContainer, SongContainerTypes } from '@/scripts/shared';
import { CirclePlus, CircleX, Clock, DiscAlbum, FolderPen, FolderX, Funnel, Hash, Pause, Play, Shuffle } from '@lucide/vue';
import { computed, ref, watch } from 'vue';
import CreateEditPlaylistDialog from '../CreateEditPlaylistDialog.vue';

const props = defineProps<{
    songContainer: SongContainer
}>();

const emit = defineEmits({
    onPlaylistDeleted(p: SongContainer) { },
    onPlaylistEdited(p: SongContainer) { },
});

const togglePlaySongContainer = ref(false);
watch(togglePlaySongContainer, () => {
    if (togglePlaySongContainer.value) {
        playerService.resume();
    } else {
        playerService.pause();
    }
});

const focusedPlaylist = ref(BLANK_SONG_CONTAINER);
watch(props, (v) => focusedPlaylist.value = v.songContainer);

const focusedCoverPath = computed(() => { return focusedPlaylist.value.coverPath; });

const focusedTitle = computed(() => {
    console.log("title changed");
    let title = '';
    switch (focusedPlaylist.value.typeName) {
        case SongContainerTypes.ALBUM:
            title = (focusedPlaylist.value.type as AlbumDto).name ?? '';
            break;
        case SongContainerTypes.PLAYLIST:
            title = focusedPlaylist.value.type.name ?? '';
            break;
    }
    console.log(title);
    return title;
});

const focusedSubtitle = computed(() => {
    switch (focusedPlaylist.value.typeName) {
        case SongContainerTypes.ALBUM:
            return (props.songContainer.type as AlbumDto).artistName;
        default:
            return '';
    }
});

function deletePlaylist() {
    if (props.songContainer.typeName == SongContainerTypes.PLAYLIST) {
        musicPlayService.deletePlaylist({ playlistId: (props.songContainer.type as PlaylistDto).id as number });
        emit('onPlaylistDeleted', props.songContainer);
    }
}

function editPlaylist(p: SongContainer) {
    focusedPlaylist.value = p;
    emit('onPlaylistEdited', p);
}
</script>

<template>
    <section class="flex flex-col gap-4 ml-4">

        <figure class="flex gap-2 mt-4">

            <div>
                <img class="min-w-48 max-w-48" :src="focusedCoverPath" />
                <span class="text-sm capitalize">{{ songContainer.typeName }}</span>
            </div>

            <figcaption class="flex flex-col">
                <strong class="underline underline-offset-8 text-lg mb-2">{{ focusedTitle }}</strong>
                <span class="text-base">{{ focusedSubtitle }}</span>
            </figcaption>
        </figure>

        <div class="flex justify-between">

            <div class="flex items-center   gap-2">


                <button class="btn btn-circle btn-xl btn-primary"
                    @click="togglePlaySongContainer = !togglePlaySongContainer">
                    <label class="swap">
                        <input type="checkbox" />
                        <Pause class="swap-on" />
                        <Play class="swap-off" />
                    </label>
                </button>

                <button class="btn btn-circle btn-neutral" @click="playerService.toggleShuffle()">
                    <Shuffle />
                </button>

                <button class="btn btn-circle btn-neutral">
                    <Funnel />
                </button>
            </div>

            <div v-show="songContainer.typeName === SongContainerTypes.PLAYLIST" class="flex gap-2">
                <button class="btn btn-circle btn-neutral">
                    <CirclePlus />
                </button>

                <button class="btn btn-circle btn-neutral" onclick="song_list_edit_playlist_dialog.showModal()">
                    <FolderPen />
                </button>

                <button class="btn btn-circle btn-neutral" onclick="song_list_dialog.showModal()">
                    <FolderX />
                </button>
            </div>

        </div>

        <table class="w-full">
            <thead class="text-lg">
                <tr>
                    <th>
                        <span class="flex justify-center items-center gap-2 w-full">
                            <Hash />
                        </span>
                    </th>
                    <th>
                        <span class="flex justify-center items-center gap-2 w-full">
                            <span>Title</span>
                        </span>
                    </th>
                    <th>
                        <span class="flex justify-center items-center gap-2 w-full">
                            <DiscAlbum />
                            <span>Album</span>
                        </span>
                    </th>
                    <th>
                        <span class="flex justify-center items-center gap-2 w-full">
                            <Clock />
                            <span>Length</span>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="songData in songContainer.type.songs" class="hover:bg-base-300">

                    <td>
                        <button class="btn btn-circle btn-ghost"
                            @click="playerService.play(new SongContainer(songData, songContainer.coverPath, songContainer.typeName))">
                            <label class="swap">
                                <input type="checkbox" />
                                <Pause class="swap-on" />
                                <Play class="swap-off" />
                            </label>
                        </button>
                    </td>

                    <td>{{ songData.name }}</td>
                    <td>{{ songData.albumName }}</td>
                    <td>{{ formatPlaybackTime(songData.length ?? 0) }}</td>
                </tr>
            </tbody>
        </table>

    </section>

    <dialog id="song_list_dialog" class="modal">
        <div class="modal-box bg-base-300 text-base-content">
            <h3 class="text-center underline underline-offset-8 text-lg">
                <strong>Delete Playlist?</strong>
            </h3>

            <div class="divider"></div>
            <div class="flex justify-evenly">
                <span>Playlist name:</span>
                <span>{{ songContainer.type.name }}</span>
            </div>

            <form class="modal-action mt-4 flex justify-center" method="dialog">
                <button class="btn btn-neutral" @click="deletePlaylist()">
                    <FolderX />
                    Delete
                </button>
                <button class="btn btn-neutral">
                    <CircleX />
                    Cancel
                </button>
            </form>
        </div>

    </dialog>

    <CreateEditPlaylistDialog id="song_list_edit_playlist_dialog" type="edit" :playlist-to-edit="songContainer"
        @on-playlist-edited="(e) => editPlaylist(e)">
    </CreateEditPlaylistDialog>

</template>
