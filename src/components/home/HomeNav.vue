<script setup lang="ts">
import LibEntry from '@/components/LibEntry.vue';
import type { PlaylistDto } from '@/scripts/api';
import { musicPlayService } from '@/scripts/service';
import type { SongContainer } from '@/scripts/shared';
import { CirclePlus, Search } from '@lucide/vue';
import { ref, watch } from 'vue';
import CreateEditPlaylistDialog from '../CreateEditPlaylistDialog.vue';

const props = defineProps<{
    playlistToDelete: SongContainer,
    playlistEdited: SongContainer,
}>();

const emit = defineEmits({
    entrySelected(e: SongContainer) { },
});

const playlists = ref(await musicPlayService.getPlaylists());

function deletePlaylist() {
    playlists.value = playlists.value.filter(
        (p) => (props.playlistToDelete.type as PlaylistDto).id != (p.type as PlaylistDto).id);
}

function editPlaylist() {
    playlists.value = playlists.value
        .filter((p) => (props.playlistEdited.type as PlaylistDto).id == (p.type as PlaylistDto).id)
        .map(() => props.playlistEdited);
}

watch(props, (v) => {
    deletePlaylist();
    editPlaylist();
});
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
            <li v-for="songContainer in playlists" :key="songContainer.type.id">
                <LibEntry :song-container="songContainer" @entry-selected="e => $emit('entrySelected', e)"></LibEntry>
            </li>
        </ul>
    </aside>

    <CreateEditPlaylistDialog id="home_nav_dialog" type="create" @on-playlist-created="(e) => playlists.push(e)">
    </CreateEditPlaylistDialog>

</template>
