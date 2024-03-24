<template>
  <VContainer>
    <Breadcrumb class="mb-5" />

    <TitlePage primary-text="Create" secondary-text="Document" />

    <VCard>
      <VCardText>
        <AppCombobox v-model="productName" class="mb-5" label="Product Name" placeholder="Product Name"
          :items="productReference" item-title="text" />
        <AppSelect v-model="category" class="mb-5 category-field" :items="categoryOptions" label="Category" />
        <div class="d-flex">
          <div class="risk-list">
            <div>List of Risks</div>
            <div v-for="(risk, index) in listRisk" :key="index" class="risk-item">
              <div class="risk-box" :class="{ active: index === activeIndexList && !isOnPreviewSuggestion }"
                @click="setActiveRisk(index)">
                <span>{{ risk.risk_name }}</span>
              </div>
              <div class="risk-action">
                <VBtn size="38" variant="plain" @click="removeRisk(index)">
                  <VIcon icon="tabler-trash" size="22" />
                </VBtn>
              </div>
            </div>
            <div class="risk-item">
              <div class="risk-input">
                <AppTextField v-model="riskName" placeholder="Risk Name" />
              </div>
              <div class="risk-action">
                <VBtn size="38" variant="plain" @click="addRisk">
                  <VIcon icon="tabler-square-plus" size="22" />
                </VBtn>
              </div>
            </div>

            <VDivider v-show="listRiskSuggestion.length > 0" class="my-2" />
            <div v-show="listRiskSuggestion.length > 0">List of Risk Suggestion
            </div>
            <div v-for="(risk, index) in listRiskSuggestion" :key="index" class="risk-item">
              <div class="risk-box" :class="{ active: index === activeIndexList && isOnPreviewSuggestion }"
                @click="setActiveRiskSuggestion(index)">
                <span>{{ risk.risk_name }}</span>
              </div>
              <div class="risk-action">
                <VBtn size="38" variant="plain" @click="addSuggestionToRiskList(index)">
                  <VIcon icon="tabler-square-plus" size="22" />
                </VBtn>
              </div>
            </div>
          </div>
          <div class="risk-form">
            <RiskForm v-if="listRisk.length > 0" v-model="modelRiskForm" :is-readonly="isOnPreviewSuggestion" />
          </div>
        </div>
      </VCardText>
      <VCardActions class="d-flex justify-end pr-6">
        <VBtn color="primary" variant="outlined" :loading="isSaveLoading" :disabled="isSubmitLoading" @click="save">
          Save
        </VBtn>
        <VBtn color="primary" variant="flat" :loading="isSubmitLoading" :disabled="isSaveLoading" @click="submit">
          Submit
        </VBtn>
      </VCardActions>
    </VCard>

  </VContainer>
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RiskForm from '@/components/RiskForm.vue';

import TitlePage from '@/components/TitlePage.vue';
import { template } from '@/config/risk';
import { useDocumentStore } from '@/store/document';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const documentStore = useDocumentStore()

const isLoading = ref(false)
const productNameTempStore = ref('')
const actionOn = ref('')
const currentUUID = ref('')
const currentId = ref(0)
const category = ref('')
const listRisk = ref([
  { ...template, risk_name: 'Risk 1' }
])
const activeIndexList = ref(0)
const riskName = ref('')
const productReference = ref([])
const listRiskSuggestion = ref([])
const isOnPreviewSuggestion = ref(false)
const categoryOptions = [
  'communication',
  'datacomm',
  'wireless',
  'internet',
]

const isSaveLoading = computed(() => {
  return isLoading.value && actionOn.value === 'save'
})

const isSubmitLoading = computed(() => {
  return isLoading.value && actionOn.value === 'submit'
})

const modelRiskForm = computed({
  get() {
    if (isOnPreviewSuggestion.value) {
      return listRiskSuggestion.value[activeIndexList.value]
    } else {
      return listRisk.value[activeIndexList.value]
    }
  },
  set(v) {
    if (!isOnPreviewSuggestion.value) {
      listRisk.value[activeIndexList.value] = v
    }
  }
})

const productName = computed({
  get() {
    if (typeof productNameTempStore.value === 'string') {
      return productNameTempStore.value
    } else if (productNameTempStore.value?.text) {
      return productNameTempStore.value.text
    } else {
      return ''
    }
  },
  set(v) {
    if (v?.id) {
      fetchDocumentRiskSuggestionByDocumentId(v.id)
    }

    return productNameTempStore.value = v
  }
})

const isEditMode = computed(() => {
  return !!route.params.uuid
})

onMounted(() => {
  router.isReady()
    .then(initialize)
})

const initialize = function () {
  fetchDocumentsDistinctProductName()
  if (isEditMode.value) {
    fetchDocumentById(route.params.uuid)
  }
}

const fetchDocumentsDistinctProductName = function () {
  documentStore.fetchDocumentsDistinctProductName()
    .then(res => {
      productReference.value = res.data.map(item => {
        return {
          ...item,
          text: item.product_name
        }
      })
    })
}

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



const getPayload = function (action) {
  const payload = {
    id: currentId.value,
    uuid: currentUUID.value,
    product_name: productName.value,
    category: category.value,
    risks: [...listRisk.value],
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
    router.push({ name: 'dashboard' })
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
    case 403:
      appStore.openSnackbar({
        message: "You are not permitted to perform this action",
        timeout: 4000,
        color: 'error'
      })
      break;
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
      appStore.openSnackbar({
        message: "There is something wrong on our server. Please contact your administrator.",
        timeout: 4000,
        color: 'error'
      })
      break;
  }
}

const onFinallyDocument = function () {
  actionOn.value = ''
  isLoading.value = false
}

const setActiveRisk = function (index) {
  activeIndexList.value = index
  isOnPreviewSuggestion.value = false
}

const setActiveRiskSuggestion = function (index) {
  activeIndexList.value = index
  isOnPreviewSuggestion.value = true
}

const addRisk = function () {
  listRisk.value.push({ ...template, risk_name: riskName.value })
  riskName.value = ''
  activeIndexList.value = listRisk.value.length - 1
}

const removeRisk = function (index) {
  if (listRisk.value.length === 1) {
    appStore.openSnackbar({
      message: "Warning: At least one list must be retained.",
      timeout: 4000,
      color: 'warning'
    })
  } else {
    listRisk.value = listRisk.value.filter((_, idx) => idx !== index)
    if (index === activeIndexList.value || index === 0) {
      activeIndexList.value = 0
    } else if (index < activeIndexList.value) {
      activeIndexList.value -= 1
    }
    isOnPreviewSuggestion.value = false
  }
}

const fetchDocumentRiskSuggestionByDocumentId = function (id) {
  documentStore.fetchDocumentById({ id })
    .then(res => {
      listRiskSuggestion.value = [...res.risk_detail]
      category.value = res.category
    })
}

const fetchDocumentById = function (id) {
  documentStore.fetchDocumentById({ id })
    .then(res => {
      const { risk_detail, product_name, uuid, id, category: categoryResponse } = res
      currentUUID.value = uuid
      currentId.value = id
      productName.value = product_name
      category.value = categoryResponse
      listRisk.value = [...risk_detail]
    })
}

const addSuggestionToRiskList = function (index) {
  listRisk.value.push({ ...listRiskSuggestion.value[index] })
  listRiskSuggestion.value.splice(index, 1)
  isOnPreviewSuggestion.value = true
}

</script>

<style lang="scss" scoped>
.risk-list {
  max-width: 250px;
  flex-grow: 1;

  display: flex;
  flex-flow: column;
  gap: 8px;

  .risk-item {
    display: flex;
    gap: 16px;

    &>div {
      flex-grow: 1;
    }

    &>div:first-child {
      width: 100%;
      max-width: 150px;
    }

    .risk-box {
      border-radius: 6px;
      background-color: transparent;
      color: rgb(var(--v-theme-primary));
      border: 1px solid rgb(var(--v-theme-primary));
      text-align: center;

      display: flex;
      align-items: center;
      padding-left: 8px;

      cursor: pointer;

      &:hover,
      &.active {
        background: rgb(var(--v-theme-primary));
        color: white;
      }

      &>span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.risk-form {
  // width: 100%;
  flex-grow: 1;
}
</style>
