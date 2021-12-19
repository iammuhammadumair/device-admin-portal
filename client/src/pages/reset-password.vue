<script setup lang="ts">
import { ref, inject, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { isDark, toggleDarkModeHandler } from '/@src/state/darkModeState'
import { useUserSession } from '/@src/stores/userSession'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { useApi } from '../composable/useApi'

const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const notif = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const api: any = useApi()

const confirm_password = ref('')
const password = ref('')

const handleResetPassword = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.post(`/api/reset-password?token=${route.query.token}`, {
        password: password.value,
        confirm_password : confirm_password.value
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Password updated successfully;')
        userSession.logoutUser()

        router.push({ name: 'login' })
      }
    } catch (error) {
      console.log('error =>' ,  error)
    }
    isLoading.value = false
  }
}

useHead({
  title: 'Login',
})
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label class="dark-mode ml-auto">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="toggleDarkModeHandler"
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Reset Account Password</h2>
          <p>Reset your account password.</p>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleResetPassword">
            <div class="login-form">
              <VField>
                <VControl icon="feather:lock">
                  <input
                    v-model="password"
                    class="input"
                    type="text"
                    placeholder="New Password"
                    autocomplete="password"
                  />
                </VControl>
              </VField>
              <VField>
                <VControl icon="feather:lock">
                  <input
                    v-model="confirm_password"
                    class="input"
                    type="text"
                    placeholder="Confirm Password"
                    autocomplete="password"
                  />
                </VControl>
              </VField>

              <!-- Submit -->
              <VControl class="login">
                <VButton
                  :loading="isLoading"
                  type="submit"
                  color="primary"
                  bold
                  fullwidth
                  raised
                >
                    Update Password
                </VButton>
              </VControl>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../scss/abstracts/_mixins.scss';
@import '../scss/pages/auth/_auth.scss';
</style>
