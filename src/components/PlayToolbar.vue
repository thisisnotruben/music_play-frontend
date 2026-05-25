<script setup lang="ts">
import { formatPlaybackTime } from '@/scripts/helper';
import { playerService } from '@/scripts/service';
import { LoopType } from '@/scripts/shared';
import { Pause, Play, Repeat, Repeat1, RepeatOff, Shuffle, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from '@lucide/vue';
import { ref, watch } from 'vue';

const togglePlay = ref(false);
watch(togglePlay, () => {
    if (togglePlay.value) {
        playerService.resume();
    } else {
        playerService.pause();
    }
});

const volume = ref(100);
watch(volume, () => {
    playerService.setVolume(volume.value);
});
</script>

<template>
    <div class="navbar h-32 bg-base-300">

        <div class="navbar-start flex items-center gap-2">
            <img class="h-16 ml-4" :src="playerService.getCover()" />
            <div class="flex flex-col">
                <strong>{{ playerService.getSong()?.name ?? '' }}</strong>
                <span>{{ playerService.getSong()?.albumName ?? '' }}</span>
            </div>
        </div>

        <div class="navbar-center flex flex-col gap-2">
            <div class="flex gap-2 items-center">
                <button class="btn btn-circle btn-neutral" @click="playerService.toggleShuffle()">
                    <Shuffle />
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.playPrev()">
                    <SkipBack class="" />
                </button>
                <button class="btn btn-circle btn-xl btn-primary" @click="togglePlay = !togglePlay">
                    <label class="swap">
                        <input type="checkbox" />
                        <Pause class="swap-on" />
                        <Play class="swap-off" />
                    </label>
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.playNext()">
                    <SkipForward />
                </button>
                <button class="btn btn-circle btn-neutral" @click="playerService.setLoopType()">
                    <RepeatOff v-show="playerService.getLoopType() == LoopType.OFF" />
                    <Repeat v-show="playerService.getLoopType() == LoopType.ALL" />
                    <Repeat1 v-show="playerService.getLoopType() == LoopType.SINGULAR" />
                </button>
            </div>

            <div class="flex items-center gap-2 text-base-content">
                <span>{{ formatPlaybackTime(playerService.getCurrentSeek()) }}</span>
                <progress class="progress w-96" value="0" max="100"></progress>
                <span>{{ formatPlaybackTime(playerService.getSong()?.length ?? 0) }}</span>
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
