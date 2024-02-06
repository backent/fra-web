<template>
  <VDialog v-model="dialogValue" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard>
      <VCardText v-show="!currentProduct.id">
        <div class="loader">
          <VProgressCircular indeterminate color="primary" />
        </div>
      </VCardText>
      <VCardTitle v-show="currentProduct.id">
        <span class="title mr-3">{{ currentProduct.product_name }}</span>
        <VChip :color="getColorStatus(currentProduct.action, authStore.currentUser.role)" variant="elevated">
          <span class="text-capitalize">{{ getStatus(currentProduct.action, authStore.currentUser.role) }}</span>
        </VChip>
      </VCardTitle>
      <VCardText v-show="currentProduct.id">
        <div class="d-flex justify-space-between align-center  mb-5">
          <div class="d-flex align-center">
            <div class="d-flex align-center gap-2">
              <AppSelect class="filter-select" v-model="computedSelectedRisk" :items="computedRisksOptions"
                item-title="text" item-value="value" return-object />
            </div>
          </div>

          <div class="d-flex align-center">
            <div class="d-flex align-center gap-2">
              <span>Updated Date:</span>

              <AppSelect class="filter-select" v-model="computedSelectedUpdateDate" :items="computedUpdateDateOptions"
                item-title="text" item-value="value" return-object />
            </div>
          </div>
        </div>

        <div class="d-flex gap-2 mb-5">
          <VChip label color="info">
            Internal & Eksternal
          </VChip>

          <VChip label :color="getColorFromAcception(displayedRisk.strategy_agreement)">
            {{ displayedRisk.strategy_agreement }}
          </VChip>
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
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteFraud" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteFraud" />
          </VCol>
        </VRow>

        <VRow class="align-stretch standard-row mb-5">
          <VCol cols="4">
            <VCard class="card" title="Source of Risk:">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.risk_source }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="4">
            <VCard class="card" title="Root Cause:">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.root_cause }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="4">
            <VCard class="card" title="Control / Prosedure (Bispro):">
              <VCardText>
                <div class="pre-text">{{ displayedRisk.bispro_control_procedure }}</div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="4">
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteRiskSource" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteRiskSource" />
          </VCol>
          <VCol cols="4">
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteRootCause" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteRootCause" />
          </VCol>
          <VCol cols="4">
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteBisproControlProcedure" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteBisproControlProcedure" />
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
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteQualitativeImpact" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteQualitativeImpact" />
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
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteAssessment" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteAssessment" />
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
            <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteJustification" label="Return Note"
              placeholder="Return note..." />
            <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteJustification" />
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <div class="text-h5 mb-3">Strategic Response</div>
        <VRow class="mb-5">
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Accepted / Not Accepted: <span
                :class="`text-uppercase ml-2 font-weight-semibold text-${getColorFromAcception(displayedRisk.strategy_agreement)}`">{{
                  displayedRisk.strategy_agreement
                }}</span></div>
          </VCol>
        </VRow>
        <VCard class="mb-5">
          <VCardText>
            <div class="text-h5 mb-3">Recommendation:</div>
            <div class="pre-text">{{ displayedRisk.strategy_recomendation }}</div>
          </VCardText>
        </VCard>
        <AppTextarea v-show="isOnRejectMode" v-model="computedRejectNoteStrategy" label="Return Note"
          placeholder="Return note..." />
        <RejectNote v-show="isDisplayRejectNote" :value="computedRejectNoteStrategy" />
        <div class="actions">
          <VDivider class="mb-5" />
          <div class="d-flex justify-end gap-3">
            <VBtn variant="outlined" color="primary" @click="close()">
              Cancel
            </VBtn>
            <VBtn v-show="isApproveBtnVisible" :disabled="isRejectLoading || currentProduct.id !== modelValue.id"
              :loading="isApproveLoading" color="success" @click="approve()">
              Approve
            </VBtn>
            <VBtn v-show="isRejectBtnVisible" :disabled="isApproveLoading || currentProduct.id !== modelValue.id"
              color="error" @click="reject()">
              Return
            </VBtn>
            <VBtn v-show="isSubmitBtnVisible" :disabled="isApproveLoading || currentProduct.id !== modelValue.id"
              :loading="isRejectLoading" color="error" @click="submit()">
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
import RejectNote from '@/components//RejectNote.vue';
import { getColorStatus, getStatus } from '@/config/document';
import { getColorFromAcception, getColorFromRisk, templateWithDetail } from '@/config/risk';
import { useAuthStore } from '@/store/auth';
import { useDocumentStore } from '@/store/document';
import { watch } from 'vue';

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
const rejectNote = ref({})
const selectedUpdatedDate = ref({})
const relatedDocumentFullData = ref([])




const currentProduct = computed(() => {
  const options = [
    { ...props.modelValue },
    ...relatedDocumentFullData.value
  ]
  return options.find(item => item.id === computedSelectedUpdateDate.value.value) ?? templateWithDetail
})

const isApproveLoading = computed(() => {
  return isLoading.value && actionOn.value === 'approve'
})

const isRejectLoading = computed(() => {
  return isLoading.value && actionOn.value === 'reject'
})

const isApproveBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'overall' || props.mode === 'approve') && (props.modelValue.action === 'submit' || props.modelValue.action === 'update')
})

const isRejectBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'overall') && (props.modelValue.action === 'submit' || props.modelValue.action === 'update')
})

const isSubmitBtnVisible = computed(() => {
  return authStore.isReviewer && (props.mode === 'reject') && (props.modelValue.action === 'submit' || props.modelValue.action === 'update')
})

const isDisplayRejectNote = computed(() => {
  return currentProduct.value.action === 'reject' && !isOnRejectMode.value
})

const isOnRejectMode = computed(() => {
  return props.mode === 'reject' && currentProduct.value.id === props.modelValue.id
})

const computedRisksOptions = computed(() => {
  return currentProduct.value.risk_detail.map(item => {
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

const computedUpdateDateOptions = computed(() => {
  const options = [
    {
      text: props.modelValue.created_at,
      value: props.modelValue.id
    },
    ...props.modelValue.related_document_detail.map(item => {
      return {
        text: item.created_at,
        value: item.id
      }
    })
  ]
  options.sort((a, b) => b.value - a.value)
  return options
})


const computedSelectedUpdateDate = computed({
  get() {
    if (!selectedUpdatedDate.value.value) {
      return {
        text: props.modelValue.created_at,
        value: props.modelValue.id
      }
    }
    return selectedUpdatedDate.value
  },
  set(v) {
    selectedUpdatedDate.value = v
  }
})

const displayedRisk = computed(() => {
  return currentProduct.value.risk_detail.find(risk => risk.id === computedSelectedRisk.value.value) ?? {
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
    .catch(onCatchDocument)
    .finally(() => {
      isLoading.value = false
      close()
    })
}

const submit = async function () {
  const payload = {
    id: parseInt(props.modelValue.id, 10),
    reject_note: []
  }
  Object.entries(rejectNote.value).forEach(([riskId, item]) => {
    const isAnyFieldFilled = Object.values(item).length > 0 && Object.values(item).some(val => !!val)
    if (isAnyFieldFilled) {
      payload.reject_note.push({
        risk_id: parseInt(riskId, 10),
        ...item
      })
    }
  })

  if (payload.reject_note.length <= 0) {
    appStore.openSnackbar({
      message: "Please fill any reject note before submit reject.",
      color: 'error',
      timeout: 3000
    })
    return
  }

  isLoading.value = true
  actionOn.value = 'reject'
  return documentStore.rejectDocument(payload)
    .then(() => {
      appStore.openSnackbar({
        message: "Successfully Reject Document",
        color: 'success',
        timeout: 3000
      })
    })
    .catch(onCatchDocument)
    .finally(() => {
      isLoading.value = false
      close()
    })
}

const reject = function () {
  emits('update:mode', 'reject')
}

const reset = function () {
  emits('update:modelValue', { ...templateWithDetail })
  emits('update:mode', 'overall')
  rejectNote.value = {}
  selectedRisk.value = ''
  actionOn.value = ''
  selectedUpdatedDate.value = {}
  relatedDocumentFullData.value = []

}

const setRejectNote = function () {
  currentProduct.value.risk_detail.forEach(risk => {
    if (risk.reject_note_detail) {
      rejectNote.value[risk.reject_note_detail.risk_id] = { ...risk.reject_note_detail }
    }
  })
}

const setComputedRejectNote = function (field) {
  return () => {
    return computed({
      get() {
        if (rejectNote.value[computedSelectedRisk.value.value] && rejectNote.value[computedSelectedRisk.value.value][field]) {
          return rejectNote.value[computedSelectedRisk.value.value][field]
        }
        return ''
      },
      set(v) {
        if (!rejectNote.value[computedSelectedRisk.value.value]) {
          rejectNote.value[computedSelectedRisk.value.value] = {}
        }
        rejectNote.value[computedSelectedRisk.value.value][field] = v
      }
    })
  }
}

const computedRejectNoteFraud = setComputedRejectNote('fraud')()
const computedRejectNoteRiskSource = setComputedRejectNote('risk_source')()
const computedRejectNoteRootCause = setComputedRejectNote('root_cause')()
const computedRejectNoteBisproControlProcedure = setComputedRejectNote('bispro_control_procedure')()
const computedRejectNoteQualitativeImpact = setComputedRejectNote('qualitative_impact')()
const computedRejectNoteAssessment = setComputedRejectNote('assessment')()
const computedRejectNoteJustification = setComputedRejectNote('justification')()
const computedRejectNoteStrategy = setComputedRejectNote('strategy')()

const updateRelatedDocument = function (documentId) {
  if (props.modelValue.id === documentId) {
    return
  }
  const isExists = relatedDocumentFullData.value.find(relatedDocument => relatedDocument.id === documentId)
  if (!isExists) {
    documentStore.fetchDocumentById({ id: documentId })
      .then(res => {
        relatedDocumentFullData.value.push(res)
      })
  }
}

const onCatchDocument = function (err) {

  switch (err.status) {
    case 409:
      appStore.openSnackbar({
        message: "Your document submission is incompatible due to the use of an outdated version.",
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

watchEffect(() => {
  dialogValue.value = props.active
})

watch(() => props.active, (val) => {
  if (!val) {
    reset()
  }
})

watch(() => currentProduct.value.id, () => {
  setRejectNote()
})

watch(selectedUpdatedDate, (v, old) => {
  if (props.active && v?.value) {
    updateRelatedDocument(v.value)
    selectedRisk.value = ''
  }
})

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
  height: 100vh;
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
