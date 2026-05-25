<script setup lang="ts">
import AccountDialogEntry from '@/components/account/AccountDialogEntry.vue';
import ToolbarLayout from '@/layouts/ToolbarLayout.vue';
import { Eye, EyeClosed, KeyRound, Mail, Pencil, User } from '@lucide/vue';

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
    <ToolbarLayout>
        <div class="account-container">

            <div class="bg-base-200 text-base-content p-6">
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

            <div class="bg-base-200 text-base-content p-6">
                <AccountDialogEntry id="username_edit" header="Username" body-key="Current Username"
                    :body-value="username" input-placeholder="New Username" type="username"
                    validator-hint="Must be >= 4 characters and <= 24 characters.">
                </AccountDialogEntry>

                <AccountDialogEntry id="password_edit" header="Password" body-key="Current Password"
                    :body-value="password" input-placeholder="New Password" type="password"
                    validator-hint="Passwords must match.">
                </AccountDialogEntry>

                <AccountDialogEntry id="email_edit" header="E-mail" body-key="Current E-mail" :body-value="email"
                    input-placeholder="New E-mail" type="email" validator-hint="Must be a proper e-mail format.">
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
                    <span>{{ username }}</span>
                    <button class="btn btn-base" onclick="username_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <KeyRound />
                        Password:
                    </span>
                    <span>
                        <label class="swap">
                            <input type="checkbox" />
                            <span class="swap-on flex gap-2">
                                <EyeClosed />
                                {{ password }}
                            </span>
                            <span class="swap-off flex gap-2">
                                <Eye />
                                {{ '*'.repeat(password.length) }}
                            </span>
                        </label>
                    </span>
                    <button class="btn btn-base" onclick="password_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">
                        <Mail />
                        Email:
                    </span>
                    <span>{{ email }}</span>
                    <button class="btn btn-base" onclick="email_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>

            <div class="bg-base-200 text-base-content p-6">
                <AccountDialogEntry id="firstName_edit" header="First Name" body-key="Current First Name"
                    :body-value="firstName" input-placeholder="Edit First Name" type="firstName"
                    validator-hint="Cannot be blank.">
                </AccountDialogEntry>

                <AccountDialogEntry id="lastName_edit" header="Last Name" body-key="Current Last Name"
                    :body-value="lastName" input-placeholder="Edit Last Name" type="lastName"
                    validator-hint="Cannot be blank.">
                </AccountDialogEntry>

                <h3>
                    <strong>
                        Personal Info
                    </strong>
                </h3>

                <div class="divider "></div>

                <div class="grid grid-cols-3 gap-4">

                    <span class="field-label">First Name:</span>
                    <span>{{ firstName }}</span>
                    <button class="btn btn-base" onclick="firstName_edit.showModal()">
                        <Pencil />
                        Edit
                    </button>

                    <span class="field-label">Last Name:</span>
                    <span>{{ lastName }}</span>
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
.account-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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