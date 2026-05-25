<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { accountService } from '@/scripts/service';
import { Ban, Eye, EyeClosed, Info, KeyRound, LogIn, User, UserPlus } from '@lucide/vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    passedUsername?: string,
    passedPassword?: string
}>();

const router = useRouter();

const textView = ref(false);
const isSuccessfulLogin = ref(true);
const username = ref(props.passedUsername ?? '');
const password = ref(props.passedPassword ?? '');

const fieldsClean = ref(true);
if (props.passedUsername && props.passedPassword) {
    console.log("fields populated")
    watch(username, () => {
        if (props.passedUsername != username.value) {
            fieldsClean.value = false;
        }
    });
    watch(password, () => {
        if (props.passedPassword != password.value) {
            fieldsClean.value = false;
        }
    });
}

async function login() {
    isSuccessfulLogin.value = await accountService.login({ username: username.value, password: password.value });
    if (isSuccessfulLogin.value) {
        router.push({ name: 'home' });
    }
}
</script>

<template>
    <BaseLayout>
        <div class="flex items-center justify-center w-full">
            <div class="bg-base-300 text-base-content p-6">
                <h2 class="text-lg"><strong>Login</strong></h2>

                <div class="divider"></div>

                <form @submit.prevent="login" class="flex flex-col gap-2">
                    <label class="input validator w-full">
                        <User />
                        <input type="text" required placeholder="Username" v-model="username" />
                    </label>
                    <p class="validator-hint hidden">
                        <span aria-label="error" class="status status-error mr-1"></span>
                        Username cannot be blank.
                    </p>

                    <label class="input validator w-full">
                        <KeyRound />
                        <input :type="textView ? 'text' : 'password'" required placeholder="Password"
                            v-model="password" />
                        <label class="swap">
                            <input type="checkbox" @click="textView = !textView" />
                            <EyeClosed class="swap-on" />
                            <Eye class="swap-off" />
                        </label>
                    </label>
                    <p class="validator-hint hidden">
                        <span aria-label="error" class="status status-error mr-1"></span>
                        Password cannot be blank.
                    </p>

                    <div v-show="!isSuccessfulLogin" role="alert" class="alert alert-error">
                        <Ban />
                        <strong>Login not successful.</strong>
                    </div>

                    <template v-if="passedUsername && passedPassword">
                        <div v-show="fieldsClean" role="alert" class="alert alert-info">
                            <Info />
                            >
                            <p>User fields passed from account creation.</p>
                        </div>
                    </template>

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
