<script setup lang="ts">
import HomeMain from '@/components/home/HomeMain.vue';
import HomeNav from '@/components/home/HomeNav.vue';
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { Suspense } from 'vue';
</script>

<template>
    <ToolbarLayout>

        <Suspense>
            <template #default>
                <HomeNav></HomeNav>
            </template>
        </Suspense>
        <HomeMain></HomeMain>

    </ToolbarLayout>
</template>
