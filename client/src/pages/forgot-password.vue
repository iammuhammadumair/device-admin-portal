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

const email = ref('')

const handleForgotPassword = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.post('/api/forgot-password', {
        email: email.value,
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Verification request is sent on your provied email')
        console.log('login =>' )
// const userSession = useUserSession()
        userSession.logoutUser();
        router.push({ name: 'login' })
      }
    } catch (error) {
      console.log('error')
    }
    isLoading.value = false
  }
}

useHead({
  title: 'Forgot Password',
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
          <h2>Recover Account</h2>
          <p>Reset your account password.</p>
          <RouterLink :to="{ name: 'signup' }">
            I do not have an account yet
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleForgotPassword">
            <div class="login-form">
              <VField>
                <VControl icon="feather:user">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email"
                    autocomplete="email"
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
                  Send Request
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
