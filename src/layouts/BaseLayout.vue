<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

const appName = 'Music Play';
</script>

<template>
    <Header :app-name="appName"></Header>
    <main>
        <slot></slot>
    </main>
    <Footer :app-name="appName"></Footer>
</template>

<style scoped>
main {
    min-height: 100vh;
}
</style>
    