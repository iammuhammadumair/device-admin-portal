<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const router = useRouter()

const notif = useNotyf()

const isLoading = ref(false)


const password = ref('')
const confirmPassword = ref('')

const api: any = useApi()

const { y } = useWindowScroll()

const isStuck = computed(() => {
    return y.value > 30
})

const handleChangePassword = async (data: any) => {
    if (!isLoading.value) {
        try {
            const response = await api.post('/api/settings/password', {
                password: password.value,
                confirm_password: confirmPassword.value,
            })

            const { response_code, data, message } = (await response.data) || {}

            if (response_code == 422) {
                notif.dismissAll()
                notif.warning(message)
            } else if (response_code == 200) {
                password.value = "";
                confirmPassword.value="";
                notif.success('Password updated Successfully')
            }
        } catch (error) {
            console.log('error =>', error)
        }
        isLoading.value = false

    }
}

</script>

<template>
    <form class="form-layout" @submit.prevent="handleChangePassword">
        <div class="form-outer">
            <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                <div class="form-header-inner">
                    <div class="left">
                        <h3>Change Password</h3>
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
                            >Update</VButton>
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
                                <label>Password</label>

                                <VControl icon="feather:unlock">
                                    <input
                                        v-model="password"
                                        type="text"
                                        class="input"
                                        autocomplete="given-name"
                                    />
                                </VControl>
                            </VField>
                            
                            <VField class="is-autocomplete-select">
                                <label>Confirm Password</label>

                                <VControl icon="feather:unlock">
                                    <input
                                        v-model="confirmPassword"
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
