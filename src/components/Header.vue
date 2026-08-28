<script setup lang="ts">
import { type SelectEntrySignalDto } from '@/scripts/shared';
import { useAuthStore } from '@/stores/auth.ts';
import { AudioWaveform, House, Info, Keyboard, LogOut, Search, SquareUser, User } from '@lucide/vue';
import { inject } from 'vue';
import SearchDialog from './SearchDialog.vue';

const appName = inject('appName');

const emit = defineEmits({
    entrySelected(selection: SelectEntrySignalDto) { },
});

const authProfilePage = import.meta.env.VITE_KEYCLOAK_ACCOUNT_CONSOLE_URL;
</script>

<template>
    <header class="navbar bg-neutral">

        <div class="navbar-start gap-2 text-neutral-content">
            <AudioWaveform />
            <h1 class="text-lg">{{ appName }}</h1>
        </div>


        <div class="navbar-center gap-2">

            <button class="btn btn-circle" @click="$router.push({ name: 'home' })">
                <House />
            </button>

            <button class="btn" onclick="header_search_dialog.showModal()"">
                    <Search />
                    What do you want to play? &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class=" flex items-center gap-2 text-sm">
                <Keyboard />
                Ctrl-K
                </span>
            </button>

        </div>

        <div class="navbar-end">
            <div class="dropdown dropdown-end">

                <button tabindex="0" role="button" class="btn btn-circle">
                    <SquareUser />
                </button>

                <ul tabindex="-1" class="menu dropdown-content bg-base-300">
                    <li>
                        <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'home' })">
                            <House />
                            <span>Home</span>
                        </button>
                    </li>
                    <li>
                        <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'about' })">
                            <Info />
                            <span>About</span>
                        </button>
                    </li>
                    <li>
                        <a :href=authProfilePage target="_blank" class="btn btn-ghost justify-between">
                            <User />
                            <span>Account</span>
                        </a>
                    </li>
                    <li>
                        <button class="btn btn-ghost justify-between" @click="useAuthStore().logout()">
                            <LogOut />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    </header>

    <SearchDialog id="header_search_dialog" :only-songs="false" :can-keyboard-shortcut="true"
        @entry-selected="(e) => $emit('entrySelected', e)">
    </SearchDialog>

</template>