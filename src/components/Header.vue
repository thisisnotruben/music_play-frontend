<script setup lang="ts">
import { type SelectEntrySignalDto } from '@/scripts/shared';
import { ArrowBigDownDash, AudioWaveform, House, Info, Keyboard, LogOut, Search, SquareUser, User } from '@lucide/vue';
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchDialog from './SearchDialog.vue';

const appName = inject('appName');

const emit = defineEmits({
    entrySelected(selection: SelectEntrySignalDto) { },
});

const router = useRouter();
const route = useRoute();
const isLogined = !['index', 'login', 'createAccount'].includes(route.name?.toString() ?? '');

function logout() {
    router.push({ name: 'login' });
}
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
                            <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'account' })">
                                <User />
                                <span>Account</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost justify-between" @click="$router.push({ name: 'about' })">
                                <Info />
                                <span>About</span>
                            </button>
                        </li>
                        <li>
                            <button class="btn btn-ghost justify-between" onclick="logout_model.showModal()">
                                <LogOut />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </template>

    </header>

    <dialog id="logout_model" class="modal">
        <div class="modal-box w-80 bg-base-300 text-base-content">
            <h3 class="text-center underline underline-offset-8 text-lg">
                <strong>Logout?</strong>
            </h3>
            <form class="modal-action" method="dialog">
                <button class="btn btn-secondary w-32" @click="logout()">
                    <LogOut />
                    <span>Leave</span>
                </button>
                <button class="btn btn-primary w-32">
                    <ArrowBigDownDash />
                    <span>Stay</span>
                </button>
            </form>
        </div>
    </dialog>

    <SearchDialog id="header_search_dialog" :only-songs="false" :can-keyboard-shortcut="true"
        @entry-selected="(e) => $emit('entrySelected', e)">
    </SearchDialog>

</template>