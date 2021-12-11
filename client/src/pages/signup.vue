<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import useNotyf from '/@src/composable/useNotyf'

import { isDark, toggleDarkModeHandler } from '/@src/state/darkModeState'
import sleep from '/@src/utils/sleep'
import { useApi } from '../composable/useApi'

const router = useRouter()
const notif = useNotyf()
const isLoading = ref(false)
const api: any = useApi()
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const name = ref('')
const handleSignup = async () => {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      const response = await api.post('/api/signup', {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Signup Successfully')
        router.push({ name: 'login' })
      }
    } catch (error) {
      console.log('error =>', error)
    }
    isLoading.value = false
  }
}

useHead({
  title: 'Signup',
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
          <h2>Join Us Now.</h2>
          <p>Start by creating your account</p>
          <RouterLink :to="{ name: 'login' }">
            I already have an account
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleSignup">
            <div class="login-form">
              <!-- Input -->
              <VField>
                <VControl icon="feather:user">
                  <input
                    v-model="name"
                    class="input"
                    type="text"
                    placeholder="Name"
                    autocomplete="name"
                  />
                </VControl>
              </VField>
              <!-- Input -->
              <VField>
                <VControl icon="feather:mail">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="email"
                  />
                </VControl>
              </VField>
              <!-- Input -->
              <VField>
                <VControl icon="feather:lock">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Password"
                  />
                </VControl>
              </VField>
              <!-- Input -->
              <VField>
                <VControl icon="feather:lock">
                  <input
                    v-model="confirm_password"
                    class="input"
                    type="password"
                    placeholder="Repeat Password"
                  />
                </VControl>
              </VField>

              <!-- Submit -->
              <VField>
                <VControl class="login">
                  <VButton
                    :loading="isLoading"
                    type="submit"
                    color="primary"
                    bold
                    fullwidth
                    raised
                  >
                    Sign Up
                  </VButton>
                </VControl>
              </VField>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
