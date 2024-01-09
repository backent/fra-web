<template>
  <VContainer>
    <Breadcrumb class="mb-5" />

    <TitlePage primary-text="Create" secondary-text="Document" />

    <VCard>
      <VCardText>
        <!-- 👉 Stepper -->
        <AppStepper v-model:current-step="currentStep" align="start" :items="numberedSteps" />
      </VCardText>

      <VDivider />

      <span v-show="currentStep === 0">
        <VCardText>
          <AppTextField v-model="form.risk_name" label="Nama Risiko" placeholder="Nama Risiko" />
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Deskripsi Risiko</div>
          <AppTextField v-model="form.fraud_schema" class="mb-3" label="Skema Fraud" placeholder="Skema Fraud" />
          <AppTextField v-model="form.fraud_motive" class="mb-3" label="Motif Fraud" placeholder="Motif Fraud" />
          <AppTextField v-model="form.fraud_technique" class="mb-3" label="Teknik Fraud" placeholder="Teknik Fraud" />
        </VCardText>
        <VDivider />
        <VCardText>
          <AppTextarea v-model="form.risk_source" class="mb-3" label="Sumber Risiko" placeholder="Sumber Risiko" />
          <AppTextarea v-model="form.root_cause" class="mb-3" label="Akar Penyebab" placeholder="Akar Penyebab" />
          <AppTextarea v-model="form.bispro_control_procedure" class="mb-3" label="Control / Procedure (Bispro)"
            placeholder="Control / Procedure (Bispro)" />
          <AppTextarea v-model="form.qualitative_impact" class="mb-3" label="Dampak Kualitatif"
            placeholder="Dampak Kualitatif" />
        </VCardText>
      </span>

      <span v-show="currentStep === 1">
        <VCardText>
          <div class="text-h6 mb-4">Fraud Schemes Assessment</div>
          <div class="d-flex">
            <VCol cols="4" class="pl-0">
              <AppTextField v-model="likelihoodAssessment" class="mb-3" label="Likehood" placeholder="Select Likehood"
                readonly @click="openLikelihoodSelectionDialog()" />
            </VCol>
            <VCol cols="4">
              <AppTextField v-model="impactAssessment" class="mb-3" label="Impact" placeholder="Select Impact" readonly
                @click="openImpactSelectionDialog()" />
            </VCol>
            <VCol cols="4" class="pr-0">
              <AppTextField :model-value="riskLevelAssessment" class="mb-3" label="Risk Level"
                placeholder="Please select likelihood & impact" disabled color="secondary" />
            </VCol>
          </div>
          <div class="alert-text">
            <VIcon size="24" icon="tabler-alert-circle" />Risk Acceptance Criteria Documentation
          </div>
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Justifikasi</div>
          <AppTextarea v-model="form.likehood_justification" class="mb-3" label="Likehood" placeholder="Likehood" />
          <AppTextarea v-model="form.impact_justification" class="mb-3" label="Impact" placeholder="Impact" />
        </VCardText>
        <VDivider />
        <VCardText>
          <div class="text-h6 mb-4">Strategi Response</div>
          <AppTextField v-model="form.strategy_agreement" class="mb-3" label="Diterima / Tidak Diterima"
            placeholder="Diterima / Tidak Diterima" />
          <AppTextarea v-model="form.strategy_recomendation" class="mb-3" label="Rekomendasi" placeholder="Rekomendasi" />
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
    <LikelihoodSelectionDialog v-model:active="likelihoodSelectionDialog" @submit="onLikelihoodSubmitHandler" />
    <ImpactSelectionDialog v-model:active="impactSelectionDialog" @submit="onImpactSubmitHandler" />
  </VContainer>
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ImpactSelectionDialog from '@/components/ImpactSelectionDialog.vue';
import LikelihoodSelectionDialog from '@/components/LikelihoodSelectionDialog.vue';
import TitlePage from '@/components/TitlePage.vue';
import { calculateRiskLevel } from '@/config/fraud';
import { useDocumentStore } from '@/store/document';
import { useRouter } from 'vue-router';

const appStore = useAppStore()
const router = useRouter()
const documentStore = useDocumentStore()

const isLoading = ref(false)
const actionOn = ref('')
const likelihoodSelectionDialog = ref(false)
const likelihoodAssessment = ref('')
const impactSelectionDialog = ref(false)
const impactAssessment = ref('')
const form = ref({
  id: '',
  document_id: '',
  user_id: '',
  risk_name: '',
  fraud_schema: '',
  fraud_motive: '',
  fraud_technique: '',
  risk_source: '',
  root_cause: '',
  bispro_control_procedure: '',
  qualitative_impact: '',
  likehood_justification: '',
  impact_justification: '',
  strategy_agreement: '',
  strategy_recomendation: ''
})

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

const riskLevelAssessment = computed(() => {
  return calculateRiskLevel(likelihoodAssessment.value, impactAssessment.value)
})

const postSubmit = function () {
  isLoading.value = true
  actionOn.value = 'submit'
  const payload = getPayload(actionOn.value)

  documentStore.submitDocument(payload)
    .then(onThenDocument('Successfully Submit Document'))
    .catch(onCatchDocument)
    .finally(onFinallyDocument)
}

const postSave = function () {
  isLoading.value = true
  actionOn.value = 'draft'
  const payload = getPayload(actionOn.value)

  documentStore.submitDocument(payload)
    .then(onThenDocument('Successfully Save Document'))
    .catch(onCatchDocument)
    .finally(onFinallyDocument)
}

const submit = function () {
  postSubmit()
}

const save = function () {
  postSave()
}

const openLikelihoodSelectionDialog = function () {
  likelihoodSelectionDialog.value = true
}

const onLikelihoodSubmitHandler = function (val) {
  likelihoodAssessment.value = val
}

const openImpactSelectionDialog = function () {
  impactSelectionDialog.value = true
}

const onImpactSubmitHandler = function (val) {
  impactAssessment.value = val
}

const getPayload = function (action) {
  const payload = {
    ...form.value,
    assessment_likehood: likelihoodAssessment.value,
    assessment_impact: impactAssessment.value,
    assessment_risk_level: riskLevelAssessment.value,
    action
  }
  return payload
}

const onThenDocument = function (message) {
  return () => {
    appStore.openSnackbar({
      message,
      timeout: 2000,
      color: 'success'
    })
    router.push({ name: 'fra-document' })
  }
}

const onCatchDocument = function (err) {
  switch (err.status) {
    case 400:
      appStore.openSnackbar({
        message: "Some field still missing.",
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

const onFinallyDocument = function () {
  actionOn.value = ''
  isLoading.value = false
}


</script>

<style lang="scss" scoped>
.alert-text {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-error));
}
</style>
