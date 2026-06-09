<script setup lang="ts">
import AccountDialogEntry from '@/components/account/AccountDialogEntry.vue';
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { accountService } from '@/scripts/service';
import { KeyRound, Mail, Pencil, User } from '@lucide/vue';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const email = ref('');
const firstName = ref('');
const lastName = ref('');

accountService.getAccountInfo().then((r) => {
    username.value = r.username ?? '';
    password.value = '*'.repeat((r.password ?? '').length);
    email.value = r.email ?? '';
    firstName.value = r.firstName ?? '';
    lastName.value = r.lastName ?? '';
});
</script>

<template>
    <ToolbarLayout>
        <div class="flex flex-col justify-center items-center gap-2 max-w-xl">

            <div class="bg-base-200 text-base-content p-6 w-full">
                <h2>
                    <strong>
                        Account Information
                    </strong>
                </h2>

                <div class="divider"></div>

                <p class="text-center">
                    View and/or edit your account.
                </p>
            </div>

            <div class="bg-base-200 text-base-content p-6 w-full">
                <AccountDialogEntry id="username_edit" header="Username" body-key="Current Username"
                    :body-value="username" input-placeholder="New Username" type="username"
                    validator-hint="Must be >= 4 characters and <= 24 characters." @field-changed="(v) => username = v">
                </AccountDialogEntry>

                <AccountDialogEntry id="password_edit" header="Password" body-key="Current Password"
                    :body-value="password" input-placeholder="New Password" type="password"
                    validator-hint="Passwords must match." @field-changed="(v) => password = v">
                </AccountDialogEntry>

                <AccountDialogEntry id="email_edit" header="E-mail" body-key="Current E-mail" :body-value="email"
                    input-placeholder="New E-mail" type="email" validator-hint="Must be a proper e-mail format."
                    @field-changed="(v) => email = v">
                </AccountDialogEntry>

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
                    <span class="break-all">{{ username }}</span>
                    <button class="btn btn-base" onclick="username_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <KeyRound />
                        Password
                    </span>
                    <span class="break-all">{{ password }}</span>
                    <button class="btn btn-base" onclick="password_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <Mail />
                        Email:
                    </span>
                    <span class="break-all">{{ email }}</span>
                    <button class="btn btn-base" onclick="email_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>

            <div class="bg-base-200 text-base-content p-6 w-full">
                <AccountDialogEntry id="firstName_edit" header="First Name" body-key="Current First Name"
                    :body-value="firstName" input-placeholder="Edit First Name" type="firstName"
                    validator-hint="Cannot be blank." @field-changed="(v) => firstName = v">
                </AccountDialogEntry>

                <AccountDialogEntry id="lastName_edit" header="Last Name" body-key="Current Last Name"
                    :body-value="lastName" input-placeholder="Edit Last Name" type="lastName"
                    validator-hint="Cannot be blank." @field-changed="(v) => lastName = v">
                </AccountDialogEntry>

                <h3>
                    <strong>
                        Personal Info
                    </strong>
                </h3>

                <div class="divider "></div>

                <div class="grid grid-cols-3 gap-4">

                    <span class="field-label">First Name:</span>
                    <span class="break-all">{{ firstName }}</span>
                    <button class="btn btn-base" onclick="firstName_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">Last Name:</span>
                    <span class="break-all">{{ lastName }}</span>
                    <button class="btn btn-base" onclick="lastName_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>

        </div>
    </ToolbarLayout>
</template>

<style scoped>
div span {
    display: flex;
    align-items: center;
}

.field-label {
    display: flex;
    justify-content: space-between;
}
</style>