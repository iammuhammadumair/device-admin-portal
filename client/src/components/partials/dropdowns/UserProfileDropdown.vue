<script setup lang="ts">
import { useUserSession } from '/@src/stores/userSession'

import { useRouter, useRoute } from 'vue-router'

const userSession = useUserSession()

const route = useRoute()
const router = useRouter()
// logoutUser

const handleLogout = () => {
  userSession.logoutUser()
  router.push('/login')
}
</script>
<template>
  <VDropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @click="toggle"
      >
        <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
      </a>
    </template>

    <template #content>
      <!-- <div class="dropdown-head">
        <VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

        <div class="meta">
          <span>Erik Kovalsky</span>
          <span>Product Manager</span>
        </div>
      </div> -->

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="handleLogout"
        >
          Logout
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>
