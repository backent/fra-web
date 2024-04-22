<script setup>
import ApplyForAnAccountDialog from '@/components/ApplyForAnAccountDialog.vue';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';

import { useAppStore } from '@/@core/stores/app';
import { resolveVuetifyTheme } from '@/@core/utils/vuetify';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

definePage({ meta: { layout: 'blank' } })

const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const applyDialog = ref(false)

const login = async function () {
  return authStore.login(form.value)
    .then(authStore.initializeCurrentUser)
    .then(() => {
      router.push('/')
    })
    .catch(catchHandler)
}

const catchHandler = function (err) {
  switch (err.status) {
    case 400:
      appStore.openSnackbar({
        message: "NIK or password is incorrect.",
        timeout: 4000,
        color: 'error'
      })
      break;
    case 500:
      appStore.openSnackbar({
        message: "There is something wrong on our server. Please contact your administrator.",
        timeout: 4000,
        color: 'error'
      })
      break;

    default:
      break;
  }
}

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth Card -->
      <VCard class="auth-card pa-4" max-width="448">
        <div class="d-flex justify-center">
          <img v-show="resolveVuetifyTheme() === 'light'" class="img-logo" src="@/assets/logo.png" />
          <img v-show="resolveVuetifyTheme() === 'dark'" class="img-logo" src="@/assets/logo-dark.png" />
        </div>

        <VCardText class="pt-1">
          <h4 class="text-h4 mb-1">
            Login
          </h4>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login()">
            <VRow>
              <!-- username -->
              <VCol cols="12">
                <AppTextField v-model="form.username" autofocus label="NIK or Username" type="email"
                  placeholder="NIK or username" />
              </VCol>

              <!-- password -->
              <VCol cols="12" class="mb-5">
                <AppTextField v-model="form.password" label="Password" placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              </VCol>

              <VCol>
                <!-- login button -->
                <VBtn block type="submit">
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <div class="text-primary ms-2 cursor-pointer" @click="applyDialog = true">
                  Apply for an account
                </div>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
    <ApplyForAnAccountDialog v-model:active="applyDialog" />
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/template/pages/page-auth.scss";

img {
  max-width: 160px;
  height: auto;
}
</style>
