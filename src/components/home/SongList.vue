<script setup lang="ts">
import { instanceOfAlbumDto, instanceOfPlaylistDto, type PlaylistDto } from '@/scripts/api';
import { formatPlaybackTime } from '@/scripts/helper';
import { musicPlayService, playerService } from '@/scripts/service';
import { SongContainer, SongContainerTypes } from '@/scripts/shared';
import { CirclePlus, CircleX, Clock, DiscAlbum, FolderX, Funnel, Hash, Pause, Play, Shuffle } from '@lucide/vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    songContainer: SongContainer
}>();

const emit = defineEmits({
    onPlaylistDeleted(p: SongContainer) { },
});

const togglePlaySongContainer = ref(false);
watch(togglePlaySongContainer, () => {
    if (togglePlaySongContainer.value) {
        playerService.resume();
    } else {
        playerService.pause();
    }
});

function getHeader(): string {
    let header = '';
    if (instanceOfAlbumDto(props.songContainer.type)) {
        header = props.songContainer.type.artistName ?? '';
    } else if (instanceOfPlaylistDto(props.songContainer.type)) {
        header = props.songContainer.type.name ?? '';
    }
    return header;
}

function deletePlaylist() {
    if (instanceOfPlaylistDto(props.songContainer.type)) {
        musicPlayService.deletePlaylist({ playlistId: (props.songContainer.type as PlaylistDto).id as number });
        emit('onPlaylistDeleted', props.songContainer);
    }
}
</script>

<template>
    <section class="flex flex-col gap-4 ml-4">

        <figure class="flex gap-2 mt-4">

            <div>
                <img class="min-w-48 max-w-48" :src="songContainer.coverPath" />
                <span class="text-sm">{{ songContainer.typeName }}</span>
            </div>

            <figcaption class="flex flex-col">
                <strong class="underline underline-offset-8 text-lg mb-2">{{ getHeader() }}</strong>
                <span class="text-base">{{ songContainer.type.name }}</span>
            </figcaption>
        </figure>

        <div class="flex gap-2 items-center">
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
                <CirclePlus />
            </button>

            <button class="btn btn-circle btn-neutral">
                <Funnel />
            </button>

            <button v-show="songContainer.typeName === SongContainerTypes.PLAYLIST" class="btn btn-circle btn-neutral"
                onclick="song_list_dialog.showModal()">
                <FolderX />
            </button>

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

</template>
