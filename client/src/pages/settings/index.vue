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

pageTitle.value = 'Settings'
useHead({
  title: 'Settings - FORM',
})
</script>

<template>
  <NavbarLayout>
    <!-- Content Wrapper -->
    <div class="page-content-inner columns">
      <AddSetting class="is-navbar" style="width: 550px;" />
      <ChangePassword class="is-navbar"  style="width: 550px;" />

    </div>
  </NavbarLayout>
</template>
