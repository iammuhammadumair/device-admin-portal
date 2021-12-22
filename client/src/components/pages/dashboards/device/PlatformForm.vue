<script setup lang="ts">

import { reactive, ref } from 'vue';
import useNotyf from '/@src/composable/useNotyf'

// import {required} from '@vuelidate/validators';
// import useVuelidate from '@vuelidate/core';
const isLoading = ref(false)


const notif = useNotyf()


const platformOptions = ref([{ value: 1, label: "Platform 1" }, { value: 2, label: "Platform 2" }, { value: 3, label: "Platform 3" }])


const state = reactive({
    platform: 0,
    username: '',
    password: ''
});
const errors = reactive({
    platform: false,
    username: false,
    password: false
})

// const props = defineProps(['platform']);


const emit = defineEmits(['handleNextStep', 'handleSkip'])

const handleNext = () => {
    // console.log('props =>' , props)
    const { platform, username, password } = state;
    if (platform === 0)
        errors.platform = true
    else
        errors.platform = false;

    if (username === '')
        errors.username = true
    else
        errors.username = false;

    if (password === '')
        errors.password = true
    else
        errors.password = false;

    if (errors.platform || errors.username || errors.password) {
        notif.dismissAll()
        notif.warning("All field are required")
    }
    else {
        emit('handleNextStep' , state);

    }
}

</script>
<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Platform Setting</p>
            <!-- <button class="delete" aria-label="close"></button> -->
        </header>
        <form class="form-layout" @submit.prevent="handleNext">
            <section class="modal-card-body">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <VField class="is-autocomplete-select">
                            <label>Platform</label>

                            <VControl icon="feather:search">
                                <Multiselect
                                    v-model="state.platform"
                                    :options="platformOptions"
                                    placeholder="Select Platform"
                                />
                            </VControl>
                        </VField>

                        <VField class="is-autocomplete-select">
                            <label>Username</label>

                            <VControl icon="feather:user">
                                <input
                                    v-model="state.username"
                                    type="text"
                                    class="input"
                                    autocomplete="given-name"
                                />
                            </VControl>
                        </VField>

                        <VField class="is-autocomplete-select">
                            <!-- :class="{ error: v$.password.$errors.length }" -->
                            <label>Password</label>

                            <VControl icon="feather:unlock">
                                <input
                                    v-model="state.password"
                                    type="text"
                                    class="input"
                                    autocomplete="given-name"
                                />
                            </VControl>
                        </VField>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot is-justify-content-space-between">
                <button class="button" type="button" @click="emit('handleSkip')">Skip</button>
                <button class="button is-success" type="submit">Next</button>
            </footer>
        </form>
    </div>
</template>