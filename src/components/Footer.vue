<script setup lang="ts">
import { AudioWaveform } from '@lucide/vue';

const props = defineProps<{
    appName: string
}>();
</script>

<template>
    <footer class="footer footer-horizontal gap-2 p-4">{{ new Date().getFullYear() }} —
        <AudioWaveform />
        {{ appName }}
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    justify-content: right;
}
</style>