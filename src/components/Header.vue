<script setup lang="ts">
import { AudioWaveform, House, Info, LogOut, Search, SquareUser, User } from '@lucide/vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    appName: string
}>();

const router = useRoute();
const isLogined = !['index', 'login', 'createAccount'].includes(router.name?.toString() ?? '');
</script>

<template>
    <header class="navbar">

        <div class="navbar-start gap-2">
            <AudioWaveform />
            <h1>
                {{ appName }}
            </h1>
        </div>

        <template v-if="isLogined">

            <div class="navbar-center gap-2">
                <button class="btn btn-circle" @click="$router.push({ name: 'home' })">
                    <House />
                </button>
                <label class="input">
                    <Search />
                    <input type="text" placeholder="What do you want to play?" class="w-64" />
                </label>
            </div>

            <div class="navbar-end">
                <div class="dropdown dropdown-end">

                    <div tabindex="0" role="button" class="btn btn-circle">
                        <SquareUser />
                    </div>

                    <ul tabindex="-1" class="menu dropdown-content w-32">
                        <li>
                            <button @click="$router.push({ name: 'account' })">
                                <User />
                                Account
                            </button>
                        </li>
                        <li>
                            <button @click="$router.push({ name: 'about' })">
                                <Info />
                                About
                            </button>
                        </li>
                        <li>
                            <button @click="$router.push({ name: 'login' })">
                                <LogOut />
                                Logout
                            </button>
                        </li>
                    </ul>

                </div>
            </div>

        </template>

    </header>
</template>