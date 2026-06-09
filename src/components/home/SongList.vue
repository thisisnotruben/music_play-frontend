<script setup lang="ts">
import { type AlbumDto, type PlaylistDto, type SongDto } from '@/scripts/api';
import { formatPlaybackTime } from '@/scripts/helper';
import { musicPlayService, playerService } from '@/scripts/service';
import { BLANK_SONG, BLANK_SONG_CONTAINER, SongContainer, SongContainerTypes } from '@/scripts/shared';
import { CircleMinus, CirclePlus, CircleX, Clock, DiscAlbum, FolderPen, FolderX, Funnel, Hash, Pause, Play, Shuffle } from '@lucide/vue';
import { computed, ref, watch } from 'vue';
import CreateEditPlaylistDialog from '../CreateEditPlaylistDialog.vue';
import SearchDialog from '../SearchDialog.vue';

const props = defineProps<{
    songContainer: SongContainer
}>();

const emit = defineEmits({
    onPlaylistDeleted(p: SongContainer) { },
    onPlaylistEdited(p: SongContainer) { },
});

const audioPlayer = ref(playerService.player);
const focusedSong = ref(BLANK_SONG);
const isPlaying = ref(false);

audioPlayer.value?.addEventListener('play', () => isPlaying.value = true);
audioPlayer.value?.addEventListener('pause', () => isPlaying.value = false);
document.addEventListener('songPlayed', (ev: CustomEventInit<SongDto>) => {
    if (ev.detail && ev.detail != BLANK_SONG) {
        focusedSong.value = ev.detail;
    }
});

function togglePlay() {
    if (isPlaying.value) {
        audioPlayer.value?.pause();
    } else {
        audioPlayer.value?.play();
    }
}

async function toggleEntry(song: SongDto) {
    // audioPlayer.value?.pause();
    await playerService.play(song, focusedPlaylist.value);
    // if (isPlaying.value) {
    // if (isPlaying.value && focusedSong.value != BLANK_SONG && song != focusedSong.value) {
    //     audioPlayer.value?.pause();
    // } else {
    //     audioPlayer.value?.pause();
    // }
}

const focusedPlaylist = ref(BLANK_SONG_CONTAINER);
watch(props, (v) => focusedPlaylist.value = v.songContainer);

const focusedCoverPath = computed(() => { return focusedPlaylist.value.coverPath; });

const focusedTitle = computed(() => {
    let title = '';
    switch (focusedPlaylist.value.typeName) {
        case SongContainerTypes.ALBUM:
            title = (focusedPlaylist.value.type as AlbumDto).name ?? '';
            break;
        case SongContainerTypes.PLAYLIST:
            title = focusedPlaylist.value.type.name ?? '';
            break;
    }
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

function addSongToPlaylist(s: SongContainer) {
    if (focusedPlaylist.value.typeName == SongContainerTypes.PLAYLIST) {
        musicPlayService.addSongToPlaylist(
            { playlistId: focusedPlaylist.value.type.id as number, songId: s.type.id as number });
        (focusedPlaylist.value.type as PlaylistDto).songs?.push(s.type);
    }
}

function deleteSongFromPlaylist(songDto: SongDto) {
    if (focusedPlaylist.value.typeName == SongContainerTypes.PLAYLIST) {
        musicPlayService.deleteSongFromPlaylist(
            { playlistId: focusedPlaylist.value.type.id as number, songId: songDto.id as number });
        (focusedPlaylist.value.type as PlaylistDto).songs = (focusedPlaylist.value.type as PlaylistDto).songs?.filter((s) => s.id != songDto.id);
    }
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
                <button class="btn btn-circle btn-xl btn-primary" @click="togglePlay()">
                    <Pause v-show="isPlaying" />
                    <Play v-show="!isPlaying" />
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.toggleShuffle()">
                    <Shuffle />
                </button>
                <button class="btn btn-circle btn-neutral">
                    <Funnel />
                </button>
            </div>

            <div v-show="songContainer.typeName === SongContainerTypes.PLAYLIST" class="flex gap-2">
                <button class="btn btn-circle btn-neutral" onclick="song_list_add_song_dialog.showModal()">
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
                    <th v-if="focusedPlaylist.typeName == SongContainerTypes.PLAYLIST"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="songData in ((focusedPlaylist.type as PlaylistDto | AlbumDto).songs as SongDto[])"
                    class="hover:bg-base-300" :class="{ 'bg-base-300': songData == focusedSong }">

                    <td>
                        <button class="btn btn-circle btn-ghost" @click="toggleEntry(songData)">
                            <Pause v-show="songData == focusedSong" />
                            <Play v-show="songData != focusedSong && focusedSong != BLANK_SONG" />
                        </button>
                    </td>

                    <td>{{ songData.name }}</td>
                    <td>{{ songData.albumName }}</td>
                    <td>{{ formatPlaybackTime(songData.length ?? 0) }}</td>
                    <td v-if="focusedPlaylist.typeName == SongContainerTypes.PLAYLIST">
                        <button class="btn btn-circle btn-ghost" @click="deleteSongFromPlaylist(songData)">
                            <CircleMinus />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </section>

    <dialog id="song_list_dialog" class="modal">
        <div class="modal-box bg-base-300 text-base-content">
            <h3 class="text-lg">
                <strong>Delete Playlist?</strong>
            </h3>

            <div class="divider"></div>
            <div class="flex justify-evenly">
                <span>Playlist name:</span>
                <span>{{ songContainer.type.name }}</span>
            </div>

            <form class="modal-action" method="dialog">
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

    <SearchDialog id="song_list_add_song_dialog" :only-songs="true" :can-keyboard-shortcut="false"
        @add-song-to-playlist="(s) => addSongToPlaylist(s)">
    </SearchDialog>

</template>
