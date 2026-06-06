<script setup lang="ts">
import type { AlbumDto, SongDto } from '@/scripts/api';
import { SongContainer, SongContainerTypes } from '@/scripts/shared';
import { CirclePlus } from '@lucide/vue';
import { useCountdown } from '@vueuse/core';
import { ref, watch } from 'vue';

const props = defineProps<{
    songContainer: SongContainer
    isSearchResult?: boolean
    isSearchResultAddSong?: boolean
}>();

const emit = defineEmits({
    entrySelected(e: SongContainer) { },
    addSongToPlaylist(s: SongContainer) { },
});

// NOTICE: used for creating playlists where the image isn't instantly available.
const imgPath = ref(props.songContainer.coverPath);
watch(props, (v) => imgPath.value = v.songContainer.coverPath);

function onErrorLoadingImg() {
    useCountdown(0.25, {
        onComplete() {
            imgPath.value = props.songContainer.coverPath;
        }
    });
}
</script>

<template>
    <figure class="flex items-center gap-2 w-full" @click="$emit('entrySelected', songContainer)">

        <img v-if="imgPath.length > 0" class="w-12 ml-4" :src="imgPath" :onerror="onErrorLoadingImg()" />

        <figcaption v-if="isSearchResult" class="flex items-center grow">
            <div class="flex flex-col justify-between grow">
                <strong>{{ songContainer.type.name }}</strong>
                <span v-if="songContainer.typeName == SongContainerTypes.ALBUM">
                    {{ (songContainer.type as AlbumDto).artistName }}
                </span>
                <span v-if="songContainer.typeName == SongContainerTypes.SONG">
                    {{ (songContainer.type as SongDto).artistName }}
                </span>
            </div>

            <button v-if="isSearchResultAddSong" class="btn btn-circle btn neutral"
                @click="$emit('addSongToPlaylist', songContainer)">
                <CirclePlus />
            </button>
            <span v-else class="capitalize">{{ songContainer.typeName }}</span>
        </figcaption>

        <figcaption v-else class="flex flex-col grow">
            <strong class="truncate max-w-48">{{ songContainer.type.name }}</strong>
            <span class="capitalize">{{ songContainer.typeName }}</span>
        </figcaption>

    </figure>
</template>
