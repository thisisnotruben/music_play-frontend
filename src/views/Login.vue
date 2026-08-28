<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { LogIn } from '@lucide/vue';

function presentLogin() {
    useAuthStore().login(window.location.origin.concat('/home'));
}
</script>

<template>
    <BaseLayout>
        <div class="flex items-center justify-center h-full">

            <div class="flex flex-col bg-base-300 text-base-content w-64 p-6">
                <h2 class="text-lg text-center"><strong>Music play</strong></h2>

                <div class="divider"></div>

                <button class="btn btn-primary" @click="presentLogin()">
                    <LogIn />Login
                </button>
            </div>

        </div>
    </BaseLayout>
</template>