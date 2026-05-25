<script setup lang="ts">
import PlayToolbar from '@/components/PlayToolbar.vue';
import BaseLayout from './BaseLayout.vue';
</script>

<template>
    <BaseLayout>
        <div class="flex flex-col grow">
            <div class="flex justify-center grow">
                <slot></slot>
            </div>
            <PlayToolbar></PlayToolbar>
        </div>
    </BaseLayout>
</template>