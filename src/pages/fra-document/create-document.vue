<template>
  <VContainer>
    <Breadcrumb class="mb-5" />

    <div class="text-h4 mb-2">Create <span class="text-secondary">Document</span></div>

    <VCard>
      <VCardText>
        <!-- 👉 Stepper -->
        <AppStepper v-model:current-step="currentStep" align="start" :items="numberedSteps" />
      </VCardText>

      <VDivider />

      <span v-show="currentStep === 0">
        <VCardText>
          <AppTextField label="Nama Risiko" placeholder="Nama Risiko" />
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Deskripsi Risiko</div>
          <AppTextField class="mb-3" label="Skema Fraud" placeholder="Skema Fraud" />
          <AppTextField class="mb-3" label="Motif Fraud" placeholder="Motif Fraud" />
          <AppTextField class="mb-3" label="Teknik Fraud" placeholder="Teknik Fraud" />
        </VCardText>
        <VDivider />
        <VCardText>
          <AppTextarea class="mb-3" label="Sumber Risiko" placeholder="Sumber Risiko" />
          <AppTextarea class="mb-3" label="Akar Penyebab" placeholder="Akar Penyebab" />
          <AppTextarea class="mb-3" label="Control / Procedure (Bispro)" placeholder="Control / Procedure (Bispro)" />
          <AppTextarea class="mb-3" label="Dampak Kualitatif" placeholder="Dampak Kualitatif" />
        </VCardText>
      </span>

      <span v-show="currentStep === 1">
        <VCardText>
          <div class="text-h6 mb-4">Fraud Schemes Assessment</div>
          <div class="d-flex">
            <VCol cols="4" class="pl-0">
              <AppTextField class="mb-3" label="Likehood" placeholder="Select Likehood" />
            </VCol>
            <VCol cols="4">
              <AppTextField class="mb-3" label="Impact" placeholder="Select Impact" />
            </VCol>
            <VCol cols="4" class="pr-0">
              <AppTextField class="mb-3" label="Risk Level" placeholder="Please select likelihood & impact" readonly
                color="secondary" />
            </VCol>
          </div>
          <div class="alert-text">
            <VIcon size="24" icon="tabler-alert-circle" />Risk Acceptance Criteria Documentation
          </div>
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Justifikasi</div>
          <AppTextarea class="mb-3" label="Likehood" placeholder="Likehood" />
          <AppTextarea class="mb-3" label="Impact" placeholder="Impact" />
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Strategi Response</div>
          <AppTextField class="mb-3" label="Diterima / Tidak Diterima" placeholder="Diterima / Tidak Diterima" />
          <AppTextarea class="mb-3" label="Rekomendasi" placeholder="Rekomendasi" />
        </VCardText>
      </span>

      <VCardActions class="d-flex justify-end pr-6">
        <VBtn v-show="currentStep === 0" color="primary" variant="flat" @click="currentStep++">
          Next
        </VBtn>
        <VBtn v-show="currentStep === 1" color="secondary" variant="tonal" @click="currentStep--">
          Previous
        </VBtn>
        <VBtn v-show="currentStep === 1" color="primary" variant="outlined" :loading="isSaveLoading"
          :disabled="isSubmitLoading" @click="save">
          Save
        </VBtn>
        <VBtn v-show="currentStep === 1" color="primary" variant="flat" :loading="isSubmitLoading"
          :disabled="isSaveLoading" @click="submit">
          Submit
        </VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore()
const router = useRouter()

const isLoading = ref(false)
const actionOn = ref('')


const numberedSteps = [
  {
    title: 'Step 1',
    subtitle: 'Step 1',
  },
  {
    title: 'Step 2',
    subtitle: 'Step 2',
  },
]

const currentStep = ref(0)

const isSaveLoading = computed(() => {
  return isLoading.value && actionOn.value === 'save'
})

const isSubmitLoading = computed(() => {
  return isLoading.value && actionOn.value === 'submit'
})

const postSubmit = function () {
  isLoading.value = true
  actionOn.value = 'submit'
  setTimeout(() => {
    appStore.openSnackbar({
      message: 'Successfully Submit Document',
      timeout: 2000,
      color: 'success'
    })
    isLoading.value = false
    actionOn.value = ''
    router.push({ name: 'fra-document' })
  }, 1000)
}

const postSave = function () {
  isLoading.value = true
  actionOn.value = 'save'
  setTimeout(() => {
    appStore.openSnackbar({
      message: 'Successfully Save Document',
      timeout: 2000,
      color: 'success'
    })
    isLoading.value = false
    actionOn.value = ''
    router.push({ name: 'fra-document' })
  }, 1000)
}

const submit = function () {
  postSubmit()
}

const save = function () {
  postSave()
}


</script>

<style lang="scss" scoped>
.alert-text {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-error));
}
</style>
