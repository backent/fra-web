<template>
  <VCard :elevation="1">
    <VTabs v-model="currentStep">
      <VTab>Data 1</VTab>
      <VTab>Data 2</VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentStep">
        <VWindowItem value="item-1">
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
        </VWindowItem>
        <VWindowItem value="item-2">
          <VCardText>
            <div class="text-h6 mb-4">Fraud Schemes Assessment</div>
            <div class="d-flex">
              <VCol cols="4" class="pl-0">
                <AppTextField v-model="form.assessment_likehood" class="mb-3" label="Likehood"
                  placeholder="Select Likehood" readonly @click="openLikelihoodSelectionDialog()" />
              </VCol>
              <VCol cols="4">
                <AppTextField v-model="form.assessment_impact" class="mb-3" label="Impact" placeholder="Select Impact"
                  readonly @click="openImpactSelectionDialog()" />
              </VCol>
              <VCol cols="4" class="pr-0">
                <AppTextField :model-value="form.assessment_risk_level" class="mb-3" label="Risk Level"
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
            <AppTextarea v-model="form.strategy_recomendation" class="mb-3" label="Rekomendasi"
              placeholder="Rekomendasi" />
          </VCardText>

        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />





  </VCard>
  <LikelihoodSelectionDialog v-model:active="likelihoodSelectionDialog" @submit="onLikelihoodSubmitHandler" />
  <ImpactSelectionDialog v-model:active="impactSelectionDialog" @submit="onImpactSubmitHandler" />
</template>

<script setup>
import ImpactSelectionDialog from '@/components/ImpactSelectionDialog.vue';
import LikelihoodSelectionDialog from '@/components/LikelihoodSelectionDialog.vue';
import { calculateRiskLevel } from '@/config/fraud';
import { template } from '@/config/risk';
import { watchEffect } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { ...template }
    }
  }
})

const emits = defineEmits('update:modelValue')

const likelihoodSelectionDialog = ref(false)
const impactSelectionDialog = ref(false)

const form = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})

const currentStep = ref(0)

watchEffect(() => {
  form.value.assessment_risk_level = calculateRiskLevel(form.value.assessment_likehood, form.value.assessment_impact)
})

const openLikelihoodSelectionDialog = function () {
  likelihoodSelectionDialog.value = true
}

const onLikelihoodSubmitHandler = function (val) {
  form.value.assessment_likehood = val
}

const openImpactSelectionDialog = function () {
  impactSelectionDialog.value = true
}

const onImpactSubmitHandler = function (val) {
  form.value.assessment_impact = val
}
</script>

<style lang="scss" scoped>
.alert-text {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-error));
}
</style>
