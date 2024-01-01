<script setup>
import ApplyForAnAccountDialog from '@/components/ApplyForAnAccountDialog.vue';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

definePage({ meta: { layout: 'blank' } })

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const applyDialog = ref(false)

const login = function () {
  return authStore.login(form.value)
    .then(authStore.initializeCurrentUser)
    .then(() => {
      router.push('/')
    })
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
          <img class="img-logo" src="@/assets/logo.png" />
        </div>

        <VCardText class="pt-1">
          <h4 class="text-h4 mb-1">
            Login aewf
          </h4>
          <p class="mb-0">
            Lorem ipsum is the dummy text.
          </p>
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
