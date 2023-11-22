<script setup>
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import { useAppStore } from './@core/stores/app'

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()
const appStore = useAppStore()
const { isSnackbarOpen, snackbarMessage, snackbarTimeout, snackbarColor } = storeToRefs(appStore)
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />

      <ScrollToTop />
    </VApp>
    <VSnackbar v-model="isSnackbarOpen" :timeout="snackbarTimeout" :color="snackbarColor">
      {{ snackbarMessage }}
    </VSnackbar>
  </VLocaleProvider>
</template>
