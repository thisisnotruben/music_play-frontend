<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { GitBranch } from '@lucide/vue';
</script>

<template>
    <BaseLayout>
        <div class="about-container">
            <div class="bg-base-200 border-base-300s p-6">
                <h2>
                    <strong>About</strong>
                </h2>

                <div class="divider "></div>

                <p class="text-center p-8">
                    This is my mock clone of a spotify-like app.
                </p>

                <div class="flex justify-end">
                    <button class="btn">
                        <GitBranch />
                        Go to Repo
                    </button>
                </div>

            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.about-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-container>* {
    width: 32rem;
}
</style>