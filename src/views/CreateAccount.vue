<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { accountService } from '@/scripts/service';
import { Ban, Check, CircleArrowLeft, Eye, EyeClosed, KeyRound, Mail, User, UserPlus } from '@lucide/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const textView = ref(false);
const confirmTextView = ref(false);
const isAccountCreated = ref(false);
const isAccountCreatedError = ref(false);

const username = ref('');
const password = ref('');
const email = ref('');
const firstName = ref('');
const lastName = ref('');

async function createAccount() {
    isAccountCreated.value = await accountService.createAccount({
        accountCreateDto: {
            username: username.value,
            password: password.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    isAccountCreatedError.value = !isAccountCreated.value;
    if (isAccountCreated) {
        setTimeout(() => {
            router.push({
                name: 'login', params: {
                    passedUsername: username.value, passedPassword: password.value
                }
            });
        }, 2_250);
    }
}
</script>

<template>
    <BaseLayout>
        <div class="flex flex-col items-center justify-center">
            <div class="bg-base-300 text-base-content p-6">
                <h2 class="text-lg"><strong>Create Account</strong></h2>

                <div class="divider"></div>

                <form @submit.prevent="createAccount" class="flex flex-col gap-2">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- username -->
                        <div>
                            <label class="input validator">
                                <User />
                                <input type="text" minlength="4" maxlength="24" required placeholder="Username"
                                    v-model="username" />
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Must be &gt;= 4 characters and &lt;= 24 characters.
                            </p>
                        </div>

                        <!-- e-mail -->
                        <div>
                            <label class="input validator">
                                <Mail />
                                <input type="email" required placeholder="E-mail" v-model="email" />
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Must be a proper e-mail format.
                            </p>
                        </div>

                        <!-- password -->
                        <div>
                            <label class="input validator">
                                <KeyRound />
                                <input :type="textView ? 'text' : 'password'" minlength="8" maxlength="24"
                                    v-model="password" required placeholder="New Password" />
                                <label class="swap">
                                    <input type="checkbox" @click="textView = !textView" />
                                    <EyeClosed class="swap-on" />
                                    <Eye class="swap-off" />
                                </label>
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Must be &gt;= 8 characters and &lt;= 24 characters.
                            </p>
                        </div>

                        <!-- confirm password -->
                        <div>
                            <label class="input validator">
                                <KeyRound />
                                <input :type="confirmTextView ? 'text' : 'password'" :pattern="password" required
                                    placeholder="Confirm Password" />
                                <label class="swap">
                                    <input type="checkbox" @click="confirmTextView = !confirmTextView" />
                                    <EyeClosed class="swap-on" />
                                    <Eye class="swap-off" />
                                </label>
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Passwords must match.
                            </p>
                        </div>

                        <!-- first name -->
                        <div>
                            <label class="input validator">
                                <input type="text" required placeholder="First Name" v-model="firstName" />
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Cannot be blank.
                            </p>
                        </div>

                        <!-- last name -->
                        <div>
                            <label class="input validator">
                                <input type="text" required placeholder="Last Name" v-model="lastName" />
                            </label>
                            <p class="validator-hint hidden">
                                <span aria-label="error" class="status status-error mr-1"></span>
                                Cannot be blank.
                            </p>
                        </div>

                    </div>

                    <div v-show="isAccountCreatedError" role="alert" class="alert alert-error">
                        <Ban />
                        <strong>Error in account creation.</strong>
                    </div>

                    <div v-show="isAccountCreated" role="alert" class="alert alert-success">
                        <Check />
                        <strong>Account created.</strong>
                    </div>

                    <div class="flex justify-end">
                        <button class="btn btn-primary flex justify-self-end" type="submit"
                            :disabled="isAccountCreated">
                            <UserPlus /> Create Account
                        </button>
                    </div>
                </form>

                <div class="divider"></div>

                <button class="btn btn-secondary" @click="$router.push({ name: 'login' })">
                    <CircleArrowLeft /> Go Back
                </button>

            </div>
        </div>
    </BaseLayout>
</template>
