<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PlatformForm from './PlatformForm.vue';
import { useUserSession } from '/@src/stores/userSession'



const step = ref(1);
const platform = ref({
    platform: 0,
    username: "",
    password: ""
});
const activeModal = ref(false)
const handleStep = (number: any) => {
    step.value = number;
}

import { useApi } from '../../.././../composable/useApi'

onMounted(async () => {

    const userSession = useUserSession()
    const interval = setInterval(() => {
        const user = userSession.getUser();
        if(user){
            clearTimeout(interval);
            if(!user.platform_id){
                activeModal.value = true;
            }
        }

    }, 1000);

});
const api: any = useApi()

const handleSave = async (data: object) => {


    try {
        const response = await api.post('/api/devices/initial-requirement', {
            platform: platform.value,
            device: data
        });
        if(response.data.response_code == 200)
            activeModal.value = false;
        
        console.log('response =>', response)
    } catch (error) {
        console.log("error =>", error);
    }
}

const handleNextStep = (data: any) => {
    console.log('data', data)
    platform.value = data;
    step.value = 2;
}


</script>


<template>
    <div class="modal" :class="[activeModal && 'is-active']">
        <div class="modal-background"></div>
        <PlatformForm v-if="step === 1" @handleNextStep="handleNextStep" @handleSkip="handleSave" />
        <DeviceForm
            v-else-if="step === 2"
            @handleBackStep="() => handleStep(1)"
            @handSave="handleSave"
        />
    </div>
</template>