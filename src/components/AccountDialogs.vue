<script setup lang="ts">
import { Eye, EyeClosed, KeyRound, Mail, User } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps<{
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
}>();

const textView = ref(false);
const confirmTextView = ref(false);
</script>

<template>

    <dialog id="username_edit" class="modal">
        <div class="modal-box">
            <h4><strong>Username</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>Current Username:</span>
                <span>{{ username }}</span>
            </div>

            <form class="mt-6 dialog-form">
                <label class="input">
                    <User />
                    <input type="text" placeholder="New username" />
                </label>
            </form>

            <form class="modal-action" method="dialog">
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
                <button class="btn btn-success">
                    <Save />
                    Save
                </button>
            </form>
        </div>
    </dialog>

    <dialog id="password_edit" class="modal">
        <div class="modal-box">
            <h4><strong>Password</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>Current Password:</span>
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
            </div>

            <form class="mt-6 dialog-form">

                <label class="input">
                    <KeyRound />
                    <input :type="textView ? 'text' : 'password'" placeholder="New Password" />
                    <label class="swap">
                        <input type="checkbox" @click="textView = !textView" />
                        <EyeClosed class="swap-on" />
                        <Eye class="swap-off" />
                    </label>
                </label>

                <label class="input">
                    <KeyRound />
                    <input :type="confirmTextView ? 'text' : 'password'" placeholder="Confirm Password" />
                    <label class="swap">
                        <input type="checkbox" @click="confirmTextView = !confirmTextView" />
                        <EyeClosed class="swap-on" />
                        <Eye class="swap-off" />
                    </label>
                </label>
            </form>

            <form class="modal-action" method="dialog">
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
                <button class="btn btn-success">
                    <Save />
                    Save
                </button>
            </form>
        </div>
    </dialog>

    <dialog id="email_edit" class="modal">
        <div class="modal-box">
            <h4><strong>Email</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>Current Email:</span>
                <span>{{ email }}</span>
            </div>

            <form class="mt-6 dialog-form">
                <label class="input">
                    <Mail />
                    <input type="text" placeholder="New email" />
                </label>
            </form>

            <form class="modal-action" method="dialog">
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
                <button class="btn btn-success">
                    <Save />
                    Save
                </button>
            </form>
        </div>
    </dialog>

    <dialog id="firstName_edit" class="modal">
        <div class="modal-box">
            <h4><strong>First Name</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>Current First Name:</span>
                <span>{{ firstName }}</span>
            </div>

            <form class="mt-6 dialog-form">
                <label class="input">
                    <input type="text" placeholder="Edit First Name" />
                </label>
            </form>

            <form class="modal-action" method="dialog">
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
                <button class="btn btn-success">
                    <Save />
                    Save
                </button>
            </form>
        </div>
    </dialog>

    <dialog id="lastName_edit" class="modal">
        <div class="modal-box">
            <h4><strong>Last Name</strong></h4>
            <div class="divider "></div>

            <div class="dialog-key-value">
                <span>Current Last Name:</span>
                <span>{{ lastName }}</span>
            </div>

            <form class="mt-6 dialog-form">
                <label class="input">
                    <input type="text" placeholder="Edit Last Name" />
                </label>
            </form>

            <form class="modal-action" method="dialog">
                <button class="btn btn-error">
                    <CircleX />
                    Cancel
                </button>
                <button class="btn btn-success">
                    <Save />
                    Save
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