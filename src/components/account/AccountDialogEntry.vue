<script setup lang="ts">
import { accountService } from '@/scripts/service';
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

const emit = defineEmits({
    fieldChanged(v: string) { },
});

const field = ref('');
function fieldSubmitted() {
    switch (props.type) {
        case "username":
            accountService.editUsername({ username: field.value });
            break;
        case "password":
            accountService.editPassword({ password: field.value });
            break;
        case "email":
            accountService.editEmail({ email: field.value });
            break;
        case "firstName":
            accountService.editFirstName({ firstName: field.value });
            break;
        case "lastName":
            accountService.editLastName({ lastName: field.value });
            break;
        default:
            return;
    }
    eval(`document.querySelector('#${props.id}').close();`);
    emit('fieldChanged', field.value);
}

const formId = props.id.concat('-form');

// password specific 
const textView = ref(false);
const confirmTextView = ref(false);
</script>

<template>
    <dialog :id="id" class="modal">
        <div class="modal-box bg-base-300 text-base-content">

            <h4 class="text-lg">
                <strong>{{ header }}</strong>
            </h4>
            <div class="divider "></div>

            <div v-if="type !== 'password'" class="dialog-key-value">
                <span>{{ bodyKey }}:</span>
                <span class="break-all">{{ bodyValue }}</span>
            </div>

            <form class="mt-6 dialog-form" :id="formId" @submit.prevent>

                <template v-if="type === 'password'">

                    <!-- TODO: enter current password -->

                    <label class="input validator">
                        <KeyRound />
                        <input :type="textView ? 'text' : 'password'" minlength="8" maxlength="24" v-model="field"
                            required placeholder="New Password" />
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

                    <label class="input validator">
                        <KeyRound />
                        <input :type="confirmTextView ? 'text' : 'password'" :pattern="field" required
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
                        <input type="text" minlength="4" maxlength="24" required :placeholder="inputPlaceholder"
                            v-model="field" />
                    </label>
                </template>

                <template v-else-if="type === 'email'">
                    <label class="input validator">
                        <Mail />
                        <input type="email" required :placeholder="inputPlaceholder" v-model="field" />
                    </label>
                </template>

                <template v-else-if="type === 'firstName' || type === 'lastName'">
                    <label class="input validator">
                        <input type="text" required :placeholder="inputPlaceholder" v-model="field" />
                    </label>
                </template>

                <p class="validator-hint hidden">
                    <span aria-label="error" class="status status-error mr-1"></span>
                    {{ validatorHint }}
                </p>
            </form>

            <form class="modal-action mt-4" method="dialog">
                <button class="btn btn-success" type="submit" :form="formId" @click="fieldSubmitted()">
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