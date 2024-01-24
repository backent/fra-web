<template>
  <VDialog v-model="dialogValue" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard>
      <VCardText v-show="!modelValue.id">
        <div class="loader">
          <VProgressCircular indeterminate color="primary" />
        </div>
      </VCardText>
      <VCardTitle v-show="modelValue.id">
        <span class="title mr-3">{{ modelValue.product_name }}</span>
        <VChip color="info" variant="elevated">
          <span class="text-capitalize">New</span>
        </VChip>
      </VCardTitle>
      <VCardText v-show="modelValue.id">
        <div class="d-flex justify-space-between align-center  mb-5">
          <div class="d-flex gap-2">
            <VChip label color="info">
              Internal & Eksternal
            </VChip>

            <VChip label color="warning">
              {{ displayedRisk.strategy_agreement }}
            </VChip>
          </div>

          <div class="d-flex align-center">
            <div class="d-flex align-center gap-2">
              <span>Risk:</span>
              <AppSelect class="filter-select" v-model="computedSelectedRisk" :items="computedRisksOptions"
                item-title="text" item-value="value" return-object />
            </div>
          </div>
        </div>

        <div class="text-h5 mb-3">Risk Description</div>
        <VRow>
          <VCol cols="2">
            Fraud Schema
          </VCol>
          <VCol cols="10">
            {{ displayedRisk.fraud_schema }}
          </VCol>
          <VCol cols="2">
            Fraud Motive
          </VCol>
          <VCol cols="10">
            {{ displayedRisk.fraud_motive }}
          </VCol>
          <VCol cols="2">
            Fraud Technique
          </VCol>
          <VCol cols="10">
            {{ displayedRisk.fraud_technique }}
          </VCol>
          <VCol cols="12">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
        </VRow>

        <VRow class="align-stretch standard-row mb-5">
          <VCol cols="12">
            <VCard class="card" title="Risk Source:">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.risk_source }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
          <VCol cols="6">
            <VCard class="card" title="Root Cause:">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.root_cause }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="6">
            <VCard class="card" title="Control / Prosedure (Bisro):">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.bispro_control_procedure }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="6">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
          <VCol cols="6">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <VRow class="mb-5">
          <VCol cols="2">
            <div class="text-h5">Qualitative Impact:</div>
          </VCol>
          <VCol cols="10">
            <div class="pre-text">{{ displayedRisk.qualitative_impact }}</div>
          </VCol>
          <VCol cols="12">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <div class="text-h5 mb-3">Fraud Schemes Assessment</div>
        <VRow class="mb-5">
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Likelihood:</div>
            <VChip :color="getColorFromRisk(displayedRisk.assessment_likehood)">
              <span class="text-capitalize">{{ displayedRisk.assessment_likehood }}</span>
            </VChip>
          </VCol>
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Impact:</div>
            <VChip :color="getColorFromRisk(displayedRisk.assessment_impact)">
              <span class="text-capitalize">{{ displayedRisk.assessment_impact }}</span>
            </VChip>
          </VCol>
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Risk Level:</div>
            <VChip :color="getColorFromRisk(displayedRisk.assessment_risk_level)">
              <span class="text-capitalize">{{ displayedRisk.assessment_risk_level }}</span>
            </VChip>
          </VCol>
          <VCol cols="12">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <div class="text-h5 mb-3">Justification</div>
        <VRow class="mb-5">
          <VCol cols="2">
            Likelihood:
          </VCol>
          <VCol cols="10">
            <div class="pre-text">{{ displayedRisk.likehood_justification }}</div>
          </VCol>
          <VCol cols="2">
            Impact:
          </VCol>
          <VCol cols="10">
            <div class="pre-text">{{ displayedRisk.impact_justification }}</div>
          </VCol>
          <VCol cols="12">
            <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <VCard class="mb-5">
          <VCardText>
            <div class="text-h5 mb-3">Recommendation:</div>
            <div class="pre-text">{{ displayedRisk.strategy_recomendation }}</div>
          </VCardText>
        </VCard>
        <AppTextarea v-show="mode === 'reject'" label="Reject Note" placeholder="Reject note..." />
        <div class="actions">
          <VDivider class="mb-5" />
          <div class="d-flex justify-end gap-3">
            <VBtn variant="outlined" color="primary" @click="close()">
              Cancel
            </VBtn>
            <VBtn v-show="isApproveBtnVisible" :disabled="isRejectLoading" :loading="isApproveLoading" color="success"
              @click="approve()">
              Approve
            </VBtn>
            <VBtn v-show="isRejectBtnVisible" :disabled="isApproveLoading" color="error" @click="reject()">
              Reject
            </VBtn>
            <VBtn v-show="isSubmitBtnVisible" :disabled="isApproveLoading" :loading="isRejectLoading" color="error"
              @click="submit()">
              Submit
            </VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue';
import { useAppStore } from '@/@core/stores/app';
import { getColorFromRisk, templateWithDetail } from '@/config/risk';
import { useAuthStore } from '@/store/auth';
import { useDocumentStore } from '@/store/document';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'overall'
  },
  modelValue: {
    type: Object,
    default: () => ({ ...templateWithDetail })
  }
})
const emits = defineEmits(['update:active', 'update:mode', 'update:modelValue'])

const appStore = useAppStore()
const authStore = useAuthStore()
const documentStore = useDocumentStore()
const dialogValue = ref(false)
const isLoading = ref(false)
const actionOn = ref('')
const selectedRisk = ref('')

watchEffect(() => {
  dialogValue.value = props.active
})

watch(() => props.active, (val) => {
  if (!val) {
    reset()
  }
})

const isApproveLoading = computed(() => {
  return isLoading.value && actionOn.value === 'approve'
})

const isRejectLoading = computed(() => {
  return isLoading.value && actionOn.value === 'reject'
})

const isApproveBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'overall' || props.mode === 'approve')
})

const isRejectBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'overall')
})

const isSubmitBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'reject')
})

const computedRisksOptions = computed(() => {
  return props.modelValue.risk_detail.map(item => {
    return {
      text: item.risk_name,
      value: item.id
    }
  })
})

const computedSelectedRisk = computed({
  get() {
    return !selectedRisk.value ? (computedRisksOptions.value[0] ?? { text: '', value: null }) : selectedRisk.value
  },
  set(v) {
    selectedRisk.value = v
  }
})

const displayedRisk = computed(() => {
  return props.modelValue.risk_detail.find(risk => risk.id === computedSelectedRisk.value.value) ?? {
    id: '',
    document_id: '',
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
    strategy_recomendation: '',
    assessment_likehood: '',
    assessment_impact: '',
    assessment_risk_level: '',
    created_at: '',
    updated_at: ''
  }
})

const close = function () {
  emits('update:active', false)
}

const approve = function () {
  isLoading.value = true
  actionOn.value = 'approve'
  documentStore.approveDocument(props.modelValue.id)
    .then(() => {
      appStore.openSnackbar({
        message: "Successfully Approve Document",
        color: 'success',
        timeout: 3000
      })
    })
    .catch(() => {
      appStore.openSnackbar({
        message: "Error While Approve Document. Please Contact your administrator",
        color: 'error',
        timeout: 3000
      })
    })
    .finally(() => {
      isLoading.value = false
      close()
    })
}

const submit = function () {
  isLoading.value = true
  actionOn.value = 'reject'
  setTimeout(() => {
    isLoading.value = false
    appStore.openSnackbar({
      message: "Successfully Reject Document",
      color: 'success',
      timeout: 1000
    })
    close()
  }, 1000)
}

const reject = function () {
  emits('update:mode', 'reject')
}

const reset = function () {
  emits('update:modelValue', { ...templateWithDetail })
}

</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}

.actions {
  position: sticky;
  bottom: 20px;

  background-color: rgba(var(--v-theme-surface), 0.8);
}

.loader {
  height: 60vh;
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
}

.pre-text {
  white-space: pre-wrap;
}

.filter-select {
  min-width: 200px;
}
</style>
