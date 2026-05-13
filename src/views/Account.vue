<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { KeyRound, Mail, Pencil, User } from '@lucide/vue';

const props = withDefaults(defineProps<{
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
}>(), {
    username: 'UsernameTest',
    password: 'passwordTest',
    email: 'email@test.com',
    firstName: 'firstNameTest',
    lastName: 'lastNameTest',
});
</script>

<template>
    <BaseLayout>
        <div class="account-container">

            <div class="bg-base-200 border-base-300 p-6">
                <h2>
                    <strong>
                        Account Information
                    </strong>
                </h2>

                <div class="divider "></div>

                <p class="text-center">
                    View and/or edit your account.
                </p>
            </div>

            <div class="bg-base-200 border-base-300 p-6">
                <h3>
                    <strong>
                        Account Info
                    </strong>
                </h3>

                <div class="divider "></div>
                <div class="grid grid-cols-3 gap-4">

                    <span class="field-label">
                        <User />
                        Username:
                    </span>
                    <span>{{ username }}</span>
                    <button class="btn btn-neutral">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <KeyRound />
                        Password:
                    </span>
                    <span>{{ password }}</span>
                    <button class="btn btn-neutral">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <Mail />
                        Email:
                    </span>
                    <span>{{ email }}</span>
                    <button class="btn btn-neutral">
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>

            <div class="bg-base-200 border-base-300 p-6">
                <h3>
                    <strong>
                        Personal Info
                    </strong>
                </h3>

                <div class="divider "></div>

                <div class="grid grid-cols-3 gap-4">

                    <span class="field-label">First Name:</span>
                    <span>{{ firstName }}</span>
                    <button class="btn btn-neutral">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">Last Name:</span>
                    <span>{{ lastName }}</span>
                    <button class="btn btn-neutral">
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>

        </div>
    </BaseLayout>
</template>

<style scoped>
.account-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    gap: 2rem;
}

.account-container>* {
    width: 32rem;
}

div span {
    display: flex;
    align-items: center;
}

.field-label {
    display: flex;
    justify-content: space-between;
}
</style>