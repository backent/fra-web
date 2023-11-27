<script setup>
import ApplyForAnAccountDialog from '@/components/ApplyForAnAccountDialog.vue';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import { themeConfig } from '@themeConfig';

definePage({ meta: { layout: 'blank' } })

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const applyDialog = ref(false)
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
        <VCardItem class="justify-center">
          <VCardTitle class="font-weight-bold text-uppercase text-h3 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-1">
          <p class="mb-0 text-center">
            Fraud Risk Assessment Online
          </p>
        </VCardText>

        <VCardText class="pt-1">
          <h4 class="text-h4 mb-1">
            Login
          </h4>
          <p class="mb-0">
            Lorem ipsum is the dummy text.
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="form.email" autofocus label="NIK or Username" type="email"
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
                <RouterLink to="/">
                  <VBtn block type="submit">
                    Login
                  </VBtn>
                </RouterLink>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <duv class="text-primary ms-2 cursor-pointer" @click="applyDialog = true">
                  Apply for an account
                </duv>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
    <ApplyForAnAccountDialog v-model:active="applyDialog" />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
