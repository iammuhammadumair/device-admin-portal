<script setup lang="ts">


import {ref , reactive} from 'vue';
import useNotyf from '/@src/composable/useNotyf'


const emit = defineEmits(['handSave' , 'handleBackStep'])


const isLoading = ref(false)

const notif = useNotyf()



const errors = reactive({
    name: false,
    serial_code: false,
    mac_code: false
})
const state = reactive({
    name: '',
    serial_code: '',
    mac_code: ''
})

const handleNext =  () => {
    const { name, serial_code, mac_code } = state;
    if (name === '')
        errors.name = true
    else
        errors.name = false;

    if (serial_code === '')
        errors.serial_code = true
    else
        errors.serial_code = false;

    if (mac_code === '')
        errors.mac_code = true
    else
        errors.mac_code = false;

    if (errors.name || errors.serial_code || errors.mac_code) {
        notif.dismissAll()
        notif.warning("All field are required")
    }else{
        emit('handSave' , state);
    }

}

</script>
<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Device</p>
            <!-- <button class="delete" aria-label="close"></button> -->
        </header>
        <form class="form-layout" @submit.prevent="handleNext">

        <section class="modal-card-body">
           
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Name</label>
                <VControl icon="heroicons-solid:device-tablet">
                  <input
                    v-model="state.name"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Mac Code</label>
                <VControl icon="iconoir:mac-os-window">
                  <input
                    v-model="state.mac_code"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Serial Code</label>
                <VControl icon="fluent:number-symbol-24-filled">
                  <input
                    v-model="state.serial_code"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-space-between">
            <button class="button" @click="emit('handleBackStep')">Back</button>
            <button class="button is-success" >Done</button>
        </footer>
        </form>
    </div>
</template>