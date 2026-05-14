<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { Eye, EyeClosed, KeyRound, LogIn, User, UserPlus } from '@lucide/vue';
import { ref } from 'vue';

const textView = ref(false);
</script>

<template>
    <BaseLayout>
        <div class="login-container">
            <div class="bg-base-200 border-base-300 p-6">
                <h2><strong>Login</strong></h2>

                <div class="divider"></div>

                <form>
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

                    <button class="btn btn-primary" type="submit">
                        <LogIn /> Login
                    </button>
                </form>

                <div class="divider"></div>
                <div class="flex justify-end">
                    <button class="btn btn-secondary" @click="$router.push({ name: 'createAccount' })">
                        <UserPlus /> Sign up
                    </button>
                </div>
            </div>
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

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>