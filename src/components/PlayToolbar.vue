<script setup lang="ts">
import { LoopType, player, type SongSource } from '@/scripts/types';
import { Pause, Play, Repeat, Repeat1, RepeatOff, Shuffle, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from '@lucide/vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    songSource: SongSource
}>();

const shuffle = ref(false);

const togglePlay = ref(false);
watch(togglePlay, () => {
    if (togglePlay.value) {
        player.resume();
    } else {
        player.pause();
    }
});

const loopTypes = [LoopType.ALL, LoopType.SINGULAR, LoopType.OFF];
const loopType = ref(LoopType.OFF);
function setloopType() {
    loopType.value = loopTypes.at((loopTypes.indexOf(loopType?.value ?? LoopType.OFF) + 1) % loopTypes.length) as number;
}

const volume = ref(100);
watch(volume, () => {
    player.setVolume(volume.value);
});

function formatPlaybackTime(seconds: number): string {
    return Math.floor(seconds / 60).toString().padStart(2, '0')
        .concat(':')
        .concat((seconds % 60).toString().padStart(2, '0'));
}

</script>

<template>
    <div class="navbar h-32">

        <div class="navbar-start flex items-center gap-2">
            <img class="h-16 ml-4" :src="songSource.getCurrentSong().coverPath" />
            <div class="flex flex-col">
                <strong>{{ player.getSong()?.name ?? '' }}</strong>
                <span>{{ player.getSong()?.artistName ?? '' }}</span>
            </div>
        </div>

        <div class="navbar-center flex flex-col gap-2">
            <div class="flex gap-2">
                <button class="btn btn-circle" @click="shuffle = !shuffle">
                    <Shuffle />
                </button>
                <button class="btn btn-circle"
                    @click="player.playSong(songSource.getPrevSong(loopType as Number, shuffle))">
                    <SkipBack />
                </button>
                <button class="btn btn-circle" @click="togglePlay = !togglePlay">
                    <label class="swap">
                        <input type="checkbox" />
                        <Pause class="swap-on" />
                        <Play class="swap-off" />
                    </label>
                </button>
                <button class="btn btn-circle"
                    @click="player.playSong(songSource.getNextSong(loopType as Number, shuffle))">
                    <SkipForward />
                </button>
                <button class="btn btn-circle" @click="setloopType()">
                    <RepeatOff v-show="loopType == LoopType.OFF" />
                    <Repeat v-show="loopType == LoopType.ALL" />
                    <Repeat1 v-show="loopType == LoopType.SINGULAR" />
                </button>
            </div>

            <div class="flex items-center gap-2">
                <span>{{ formatPlaybackTime(player.getCurrentSeek()) }}</span>
                <progress class="progress w-96" value="0" max="100"></progress>
                <span>{{ formatPlaybackTime(player.getSong()?.length ?? 0) }}</span>
            </div>
        </div>

        <span class="navbar-end gap-2">
            <VolumeX v-show="volume == 0" />
            <Volume v-show="volume > 0 && volume <= 33" />
            <Volume1 v-show="volume > 33 && volume <= 66" />
            <Volume2 v-show="volume > 66" />

            <input type="range" min="0" max="100" value="100" class="range range-xs w-32 mr-4" v-model="volume" />
        </span>

    </div>
</template>

<style scoped></style>