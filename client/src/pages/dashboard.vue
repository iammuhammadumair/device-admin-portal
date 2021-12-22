<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:3000/navbar-blank-page-1
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/navbarLayoutState'
import { ref } from 'vue'

type TabId = 'active' | 'inactive'
const activeTab = ref<TabId>('active')

pageTitle.value = 'Dashboard'
useHead({
  title: 'Dashboard - Home',
})
</script>

<template>
  <NavbarLayout>
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <!--
        Page content goes here

        You can see pages content samples from 
        files in /src/components/pages directory
      -->
      <DashboardDeviceList :active-tab="activeTab" />
      <InitialRequirement/>
    </div>
  </NavbarLayout>
</template>
