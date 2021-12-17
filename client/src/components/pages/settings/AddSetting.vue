<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const router = useRouter()

const notif = useNotyf()

const isLoading = ref(false)

const platform = ref(0)
const platformOptions = ref([{ value: 1, label: "Platform 1" }, { value: 2, label: "Platform 2" }, { value: 3, label: "Platform 3" }])

const username = ref('')
const password = ref('')
// const codeOptions = ref([])

const api: any = useApi()
// onMounted(async () => {

// })

const handlePlatformSelecton = async (event: any) => {
    platform.value = event;
    if (event) {
        console.log('event =>' , event)
        try {
            const response = await api.get(`/api/settings/${event}`)
            const { response_code, data, message } = (await response.data) || {}
            if (response_code == 200) {
                // platform.value = data.platform_id;
                username.value = data.username;
                password.value = data.password;

            }
        } catch (error) {
            console.log('error =>', error)
        }
    }
}

const { y } = useWindowScroll()

const isStuck = computed(() => {
    return y.value > 30
})

const handleSetting = async (data: any) => {
    if (!isLoading.value) {
        try {
            const response = await api.post('/api/settings', {
                platform_id: platform.value,
                username: username.value,
                password: password.value,
            })

            const { response_code, data, message } = (await response.data) || {}

            if (response_code == 422) {
                notif.dismissAll()
                notif.warning(message)
            } else if (response_code == 200) {
                notif.success('Setting Added Successfully')

                // router.push({ name: 'dashboard' })
            }
        } catch (error) {
            console.log('error =>', error)
        }
        isLoading.value = false
    }
}
</script>

<template>
    <form class="form-layout" @submit.prevent="handleSetting">
        <div class="form-outer">
            <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                <div class="form-header-inner">
                    <div class="left">
                        <h3>Setting</h3>
                    </div>
                    <div class="right">
                        <div class="buttons">
                            <VButton
                                icon="lnir lnir-arrow-left rem-100"
                                :to="{ name: 'dashboard' }"
                                light
                                dark-outlined
                            >Cancel</VButton>
                            <VButton
                                :loading="isLoading"
                                type="submit"
                                color="primary"
                                raised
                            >Setting</VButton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading">
                        <h4>Info</h4>
                        <!-- <p>This helps us to know you</p> -->
                    </div>

                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <VField class="is-autocomplete-select">
                                <label>Platform</label>

                                <VControl icon="feather:search">
                                    <Multiselect
                                        v-model="platform"
                                        :options="platformOptions"
                                        placeholder="Select Platform"
                                        @change="handlePlatformSelecton"
                                    />
                                </VControl>
                            </VField>

                            <VField class="is-autocomplete-select">
                                <label>Username</label>

                                <VControl icon="feather:search">
                                    <input
                                        v-model="username"
                                        type="text"
                                        class="input"
                                        autocomplete="given-name"
                                    />
                                </VControl>
                            </VField>

                            <VField class="is-autocomplete-select">
                                <label>Password</label>

                                <VControl icon="feather:search">
                                    <input
                                        v-model="password"
                                        type="text"
                                        class="input"
                                        autocomplete="given-name"
                                    />
                                </VControl>
                            </VField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_forms.scss";
</style>
