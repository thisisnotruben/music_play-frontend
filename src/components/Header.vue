<script setup lang="ts">
import { AudioWaveform, House, Info, Keyboard, LogOut, Search, SquareUser, User } from '@lucide/vue';
import { useKeyModifier, useMagicKeys } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
    appName: string
}>();

const router = useRouter();
const route = useRoute();
const isLogined = !['index', 'login', 'createAccount'].includes(route.name?.toString() ?? '');

function logout() {
    router.push({ name: 'login' });
}

const ctrlMod = useKeyModifier('Control');
const { k, escape } = useMagicKeys();
const showPopupSearch = ref(false);
watchEffect(() => {
    if (ctrlMod.value && k?.value) {
        showPopupSearch.value = true;
    } else if (escape?.value) {
        showPopupSearch.value = false;
    }
});

document.onkeydown = function (e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
    }
};
</script>

<template>
    <header class="navbar bg-neutral">

        <div class="navbar-start gap-2 text-neutral-content">
            <AudioWaveform />
            <h1 class="text-lg">{{ appName }}</h1>
        </div>

        <template v-if="isLogined">

            <div class="navbar-center gap-2">
                <button class="btn btn-circle" @click="$router.push({ name: 'home' })">
                    <House />
                </button>
                <label class="input">
                    <Search />
                    <input type="text" placeholder="What do you want to play?" class="w-64" />
                    <span class="flex items-center gap-2 text-sm">
                        Ctrl-K
                        <Keyboard />
                    </span>
                </label>
            </div>

            <div class="navbar-end">
                <div class="dropdown dropdown-end">

                    <button tabindex="0" role="button" class="btn btn-circle">
                        <SquareUser />
                    </button>

                    <ul tabindex="-1" class="menu dropdown-content bg-base-300">
                        <li>
                            <button class="btn btn-ghost" @click="$router.push({ name: 'account' })">
                                <User />
                                <span>Account</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost" @click="$router.push({ name: 'about' })">
                                <Info />
                                <span>About</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost" onclick="logout_model.showModal()">
                                <LogOut />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </template>

    </header>

    <dialog id="search_model" class="modal" :class="{ 'modal-open': showPopupSearch }">
        <div class="modal-box w-192 bg-base-300 text-base-content">
            <label class="input w-full">
                <Search />
                <input type="text" placeholder="What do you want to play?" />
            </label>
        </div>
        <form method="dialog" class="modal-backdrop">

        </form>
    </dialog>

    <dialog id="logout_model" class="modal">
        <div class="modal-box w-48 bg-base-300 text-base-content">
            <h3 class="text-center"><strong>Logout?</strong></h3>
            <form class="modal-action" method="dialog">
                <button class="btn w-16 btn-warning" @click="logout()">Leave</button>
                <button class="btn w-16 btn-success">Stay</button>
            </form>
        </div>
    </dialog>

</template>