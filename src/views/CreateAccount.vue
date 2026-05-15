<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { CircleArrowLeft, Eye, EyeClosed, KeyRound, Mail, User, UserPlus } from '@lucide/vue';
import { ref } from 'vue';

const newPassword = ref('');
const textView = ref(false);
const confirmTextView = ref(false);
</script>

<template>
    <BaseLayout>
        <div class="create-account-container">
            <div class="bg-base-200 border-base-300 p-6">
                <h2><strong>Create Account</strong></h2>

                <div class="divider"></div>

                <form>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- username -->
                        <div>
                            <label class="input validator">
                                <User />
                                <input type="text" minlength="4" maxlength="24" required placeholder="Username" />
                            </label>
                            <p class="validator-hint hidden">
                                Must be &gt;= 4 characters and &lt;= 24 characters.
                            </p>
                        </div>

                        <!-- e-mail -->
                        <div>
                            <label class="input validator">
                                <Mail />
                                <input type="email" required placeholder="E-mail" />
                            </label>
                            <p class="validator-hint hidden">Must be a proper e-mail format.</p>
                        </div>

                        <!-- password -->
                        <div>
                            <label class="input validator">
                                <KeyRound />
                                <input :type="textView ? 'text' : 'password'" minlength="8" maxlength="24"
                                    v-model="newPassword" required placeholder="New Password" />
                                <label class="swap">
                                    <input type="checkbox" @click="textView = !textView" />
                                    <EyeClosed class="swap-on" />
                                    <Eye class="swap-off" />
                                </label>
                            </label>
                            <p class="validator-hint hidden">Must be &gt;= 8 characters and &lt;= 24 characters.</p>
                        </div>

                        <!-- confirm password -->
                        <div>
                            <label class="input validator">
                                <KeyRound />
                                <input :type="confirmTextView ? 'text' : 'password'" :pattern="newPassword" required
                                    placeholder="Confirm Password" />
                                <label class="swap">
                                    <input type="checkbox" @click="confirmTextView = !confirmTextView" />
                                    <EyeClosed class="swap-on" />
                                    <Eye class="swap-off" />
                                </label>
                            </label>
                            <p class="validator-hint hidden">Passwords must match.</p>
                        </div>

                        <!-- first name -->
                        <div>
                            <label class="input validator">
                                <input type="text" required placeholder="First Name" />
                            </label>
                            <p class="validator-hint hidden">Cannot be blank.</p>
                        </div>

                        <!-- last name -->
                        <div>
                            <label class="input validator">
                                <input type="text" required placeholder="Last Name" />
                            </label>
                            <p class="validator-hint hidden">Cannot be blank.</p>
                        </div>

                    </div>
                    <div class="flex justify-end">
                        <button class="btn btn-primary flex justify-self-end" type="submit">
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

<style scoped>
.create-account-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
