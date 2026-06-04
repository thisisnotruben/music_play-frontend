<script setup lang="ts">
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { GitBranch } from '@lucide/vue';
</script>

<template>
    <ToolbarLayout>
        <div class="flex justify-center items-center">
            <div class="bg-base-200 text-base-content p-6">

                <h2><strong>About</strong></h2>
                <div class="divider "></div>

                <p class="text-center p-8">
                    This is my mock clone of a spotify-like app.
                </p>

                <div class="flex justify-end">
                    <a class="btn btn-base" href="https://github.com/thisisnotruben/music_play-frontend"
                        target="_blank">
                        <GitBranch />
                        Go to Repo
                    </a>
                </div>

            </div>
        </div>
    </ToolbarLayout>
</template>
