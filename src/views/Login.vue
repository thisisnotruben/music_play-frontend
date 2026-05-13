<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { Eye, EyeClosed, KeyRound, LogIn, User } from '@lucide/vue';
import { ref } from 'vue';

const textView = ref(false);
</script>

<template>
    <BaseLayout>
        <div class="login-container">
            <fieldset class="fieldset bg-base-200 border-base-300 w-xs p-6">
                <legend class="fieldset-legend">Login</legend>

                <label class="input">
                    <User />
                    <input type="text" placeholder="Username" />
                </label>

                <label class="input">
                    <KeyRound />
                    <input :type="textView ? 'text' : 'password'" placeholder="Password" />
                    <label class="swap">
                        <input type="checkbox" @click="textView = !textView" />
                        <EyeClosed class="swap-on" />
                        <Eye class="swap-off" />
                    </label>
                </label>

                <button class="btn btn-neutral mt-4">
                    <LogIn /> Login
                </button>

            </fieldset>
        </div>
    </BaseLayout>
</template>

<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    max-width: 100%;
}
</style>