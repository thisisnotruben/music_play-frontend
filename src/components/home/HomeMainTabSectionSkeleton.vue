<script setup lang="ts">
import { musicPlayService } from '@/scripts/service';
import LibCard from '../LibCard.vue';
</script>

<template>
    <ul class="list">
        <template v-for="[_, entries] in musicPlayService.getDummyMusic(4, 12)">

            <li class="list-row flex flex-col">

                <div class="bg-base-300 w-64 h-6" />

                <div class="flex flex-wrap gap-2">
                    <LibCard v-for="entry in entries" :song-container="entry" :skeleton="true">
                    </LibCard>
                </div>

            </li>

        </template>
    </ul>
</template>