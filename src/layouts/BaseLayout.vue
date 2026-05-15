<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

const appName = 'Music Play';
</script>

<template>
    <div class="main-container flex flex-col">
        <Header :app-name="appName"></Header>
        <main class="flex-1">
            <slot></slot>
        </main>
        <Footer :app-name="appName"></Footer>
    </div>
</template>

<style>
body {
    height: 100vh;
}

#app,
.main-container {
    height: inherit;
}

main>*:first-child {
    height: -webkit-fill-available;
}
</style>