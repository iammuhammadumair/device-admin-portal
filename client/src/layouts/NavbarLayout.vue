<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type {
  VAvatarProps,
  VAvatarColor,
} from '/@src/components/base/avatar/VAvatar.vue'
import type { UserPopover } from '/@src/models/users'
import { popovers } from '/@src/data/users/userPopovers'
import { pageTitle } from '/@src/state/navbarLayoutState'
import { activePanel } from '/@src/state/activePanelState'

export type NavbarTheme = 'default' | 'colored' | 'fade'
export type SubnavId =
  | 'closed'
  | 'home'
  | 'layouts'
  | 'elements'
  | 'components'
  | 'search'

const props = withDefaults(
  defineProps<{
    theme?: NavbarTheme
    nowrap?: boolean
  }>(),
  {
    theme: 'default',
  }
)

const route = useRoute()
const filter = ref('')
const isMobileSidebarOpen = ref(false)
// const activeMobileSubsidebar = ref('dashboard')
const activeSubnav = ref<SubnavId>('closed')

watch(
  () => route.fullPath,
  () => {
    activeSubnav.value = 'closed'
    isMobileSidebarOpen.value = false
  }
)
</script>

<template>
  <div class="navbar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <RouterLink :to="{ name: 'dashboard' }">
            <!-- :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']" -->
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'devices' }">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
          </RouterLink>
        </li>
      </template>
    </MobileSidebar>

    <!-- Desktop navigation -->
    <Navbar :theme="props.theme">
      <!-- Custom navbar title -->
      <template #title>
        <RouterLink :to="{ name: 'index' }" class="brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="separator"></div>

        <!-- <ProjectsQuickDropdown /> -->
        <h1 class="title is-5">{{ pageTitle }}</h1>
      </template>

      <!-- Custom navbar toolbar -->
      <template #toolbar>
        <UserProfileDropdown right />
      </template>

      <!-- Custom navbar links -->
      <template #links>
        <div
          class="centered-links"
          :class="[activeSubnav === 'search' && 'is-hidden']"
        >
          <RouterLink
            :to="{ name: 'dashboard' }"
            :class="[route.path.startsWith('/dashboard') && 'is-active']"
            class="centered-link centered-link-toggle"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
            <span>Dashboard</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'devices' }"
            :class="[route.path.startsWith('/devices') && 'is-active']"
            class="centered-link centered-link-toggle"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
            <span>Devices</span>
          </RouterLink>
          <!-- <RouterLink
            :to="{ name: 'access-codes' }"
            :class="[route.path.startsWith('/access-codes') && 'is-active']"
            class="centered-link centered-link-toggle"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
            <span>Access Codes</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'activated-devices' }"
            :class="[
              route.path.startsWith('/activated-devices') && 'is-active',
            ]"
            class="centered-link centered-link-toggle"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:activity"
            ></i>
            <span>Activated Devices</span>
          </RouterLink> -->
          <!-- </a> -->
        </div>
      </template>

      <!-- Custom navbar sub navigation -->
    </Navbar>

    <div class="view-wrapper has-top-nav">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="is-navbar-lg">
            <div class="page-title has-text-centered">
              <!-- Mobile Page Title -->
              <div class="title-wrap">
                <h1 class="title is-4">{{ pageTitle }}</h1>
              </div>
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
