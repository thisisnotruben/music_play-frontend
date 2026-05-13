<script setup lang="ts">
import { Info, LogOut, Search, SquareUser, User, AudioWaveform } from '@lucide/vue';

const props = defineProps<{
    appName: string
}>();

</script>

<template>
    <div class="navbar">

        <div class="navbar-start gap-2">
            <AudioWaveform />
            <h1>
                {{ appName }}
            </h1>
        </div>

        <div class="navbar-center">
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

    </div>
</template>