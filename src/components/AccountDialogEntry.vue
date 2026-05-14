<script setup lang="ts">

import { CircleX, Eye, EyeClosed, KeyRound, Mail, Save, User } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps<{
    id: string
    header: string
    bodyKey: string
    bodyValue: string
    inputPlaceholder: string
    validatorHint?: string
    type: string
}>();

const formId = props.id.concat('-form');

const newPassword = ref('');
const textView = ref(false);
const confirmTextView = ref(false);
</script>

<template>
    <dialog :id="id" class="modal">
        <div class="modal-box">

            <h4><strong>{{ header }}</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>{{ bodyKey }}:</span>
                <span>
                    <template v-if="type === 'password'">
                        <label class="swap">
                            <input type="checkbox" />
                            <span class="swap-on flex gap-2">
                                <EyeClosed />
                                {{ bodyValue }}
                            </span>
                            <span class="swap-off flex gap-2">
                                <Eye />
                                {{ '*'.repeat(bodyValue.length) }}
                            </span>
                        </label>
                    </template>
                    <template v-else>
                        {{ bodyValue }}
                    </template>
                </span>
            </div>

            <form class="mt-6 dialog-form" :id="formId">

                <template v-if="type === 'password'">
                    <label class="input validator">
                        <KeyRound />
                        <input :type="textView ? 'text' : 'password'" minlength="8" maxlength="24" v-model="newPassword"
                            required placeholder="New Password" />
                        <label class="swap">
                            <input type="checkbox" @click="textView = !textView" />
                            <EyeClosed class="swap-on" />
                            <Eye class="swap-off" />
                        </label>
                    </label>
                    <p class="validator-hint hidden">Must be &gt;= 8 characters and &lt;= 24 characters.</p>

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
                </template>

                <template v-else-if="type === 'username'">
                    <label class="input validator">
                        <User />
                        <input type="text" minlength="4" maxlength="24" required :placeholder="inputPlaceholder" />
                    </label>
                </template>

                <template v-else-if="type === 'email'">
                    <label class="input validator">
                        <Mail />
                        <input type="email" required :placeholder="inputPlaceholder" />
                    </label>
                </template>

                <template v-else-if="type === 'firstName' || type === 'lastName'">
                    <label class="input validator">
                        <input type="text" required :placeholder="inputPlaceholder" />
                    </label>
                </template>

                <p class="validator-hint hidden">{{ validatorHint }}</p>
            </form>

            <form class="modal-action mt-4" method="dialog">
                <button class="btn btn-success" type="submit" :form="formId">
                    <Save />
                    Save
                </button>
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
            </form>

        </div>
    </dialog>
</template>

<style scoped>
.dialog-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.dialog-key-value {
    display: flex;
    justify-content: space-evenly;
}
</style>