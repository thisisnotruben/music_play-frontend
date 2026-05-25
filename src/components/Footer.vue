<script setup lang="ts">
import { AudioWaveform } from '@lucide/vue';

const props = defineProps<{
    appName: string
}>();
</script>

<template>
    <footer class="footer-horizontal gap-2 p-4 text-sm bg-neutral text-neutral-content">
        <span>{{ new Date().getFullYear() }} —</span>
        <AudioWaveform class="w-4" />
        <span>{{ appName }}</span>
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    justify-content: right;
    align-items: center;
}
</style>