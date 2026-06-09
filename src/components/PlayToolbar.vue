<script setup lang="ts">
import type { SongDto } from '@/scripts/api';
import { formatPlaybackTime } from '@/scripts/helper';
import { getFullPath, playerService } from '@/scripts/service';
import { BLANK_SONG, LoopType, Player } from '@/scripts/shared';
import { Pause, Play, Repeat, Repeat1, RepeatOff, Shuffle, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from '@lucide/vue';
import { ref, useTemplateRef, watch } from 'vue';

const audioPlayer = useTemplateRef<HTMLMediaElement>('audio-player');
const focusedSong = ref(BLANK_SONG);
const isPlaying = ref(false);

const progress = ref(0.0);
watch(audioPlayer, (v) => {
    if (v) {
        playerService.init(v);
        v.addEventListener('timeupdate', () => progress.value = v.currentTime / v.duration);
        v.addEventListener('play', () => isPlaying.value = true);
        v.addEventListener('pause', () => isPlaying.value = false);

        document.addEventListener('songPlayed', (ev: CustomEventInit<SongDto>) => {
            if (ev.detail && ev.detail != BLANK_SONG) {
                focusedSong.value = ev.detail;
            }
        });
    }
}, { immediate: true });

function togglePlay() {
    if (isPlaying.value) {
        audioPlayer.value?.pause();
    } else {
        audioPlayer.value?.play();
    }
}

const volume = ref(1.0);
watch(volume, (v) => {
    if (audioPlayer.value) {
        audioPlayer.value.volume = Math.min(Math.max(v, 0.0), 1.0);
    }
}, { immediate: true });

const loopType = ref(playerService.getLoopType());
function setLoopType() {
    let currIndex = Player.loopTypes.indexOf(loopType.value);
    currIndex++;

    loopType.value = Player.loopTypes[currIndex % Player.loopTypes.length] as number;
    playerService.setLoopType(loopType.value);
}
</script>

<template>
    <div class="navbar h-32 bg-base-300">

        <audio ref="audio-player"></audio>

        <div v-show="focusedSong != BLANK_SONG" class="navbar-start flex items-center gap-2">
            <img class="h-16 ml-4" :src="getFullPath(focusedSong.coverPath ?? '')" />
            <div class="flex flex-col">
                <strong>{{ focusedSong.name }}</strong>
                <span>{{ focusedSong.albumName }}</span>
            </div>
        </div>

        <div class="navbar-center flex flex-col gap-2">
            <div class="flex gap-2 items-center">
                <button class="btn btn-circle" :class="{ 'btn-neutral': playerService.getShuffle() }"
                    @click="playerService.toggleShuffle()">
                    <Shuffle />
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.playPrev()">
                    <SkipBack class="" />
                </button>
                <button class="btn btn-circle btn-xl btn-primary" @click="togglePlay()">
                    <Pause v-show="isPlaying" />
                    <Play v-show="!isPlaying" />
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.playNext()">
                    <SkipForward />
                </button>
                <button class="btn btn-circle" :class="{ 'btn-neutral': loopType != LoopType.OFF, }"
                    @click="setLoopType()">
                    <RepeatOff v-show="loopType == LoopType.OFF" />
                    <Repeat v-show="loopType == LoopType.ALL" />
                    <Repeat1 v-show="loopType == LoopType.SINGULAR" />
                </button>
            </div>

            <div class="flex items-center gap-2 text-base-content">
                <span>{{ formatPlaybackTime(audioPlayer?.currentTime ?? 0.0) }}</span>
                <progress class="progress w-96" :value="progress" max="1.0"></progress>
                <span>{{ formatPlaybackTime(audioPlayer?.duration ?? 0.0) }}</span>
            </div>
        </div>

        <span class="navbar-end gap-2">
            <VolumeX v-show="volume == 0" />
            <Volume v-show="volume > 0 && volume <= 33" />
            <Volume1 v-show="volume > 33 && volume <= 66" />
            <Volume2 v-show="volume > 66" />

            <input type="range" min="0.0" max="1.0" step="0.1" value="1.0" class="range range-xs w-32 mr-4"
                v-model="volume" />
        </span>

    </div>
</template>
