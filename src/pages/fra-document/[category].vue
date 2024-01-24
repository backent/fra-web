<template>
  <VContainer>
    <Breadcrumb class="mb-5" />
    <TitlePage primary-text="Document" secondary-text="List" />

    <VCard>
      <VCardText>
        <VDataTableServer :headers="headers" :items="data" v-model:items-per-page="query.take" v-model:page="page"
          :items-length="totalData" @update:options="onUpdateOptions">
          <template #item.risk_level="{ value, item }">
            <VChip :color="getColorFromRisk(value)" variant="elevated">
              <span class="text-capitalize">{{ value }}</span>
            </VChip>
          </template>
          <template #item.action="{ value }">
            <span class="text-capitalize" :class="`text-${getColorFromStatus(value)}`">{{ value }}</span>
          </template>
          <template #item.actions="{ item }">
            <VRow>
              <VCol cols="4">
                <VBtn variant="tonal" color="info" size="38" @click="openDetailDialog(item.id)">
                  <VIcon icon="tabler-eye" size="22" />
                </VBtn>
              </VCol>
              <VCol v-show="isEditBtnVisible(item)" cols="4">
                <VBtn variant="tonal" color="warning" size="38" @click="openEdit(item.id)">
                  <VIcon icon="tabler-edit" size="22" />
                </VBtn>
              </VCol>
              <VCol v-show="isApproveBtnVisible(item)" cols="4">
                <VBtn variant="tonal" color="success" size="38" @click="openApproveDialog(item.id)">
                  <VIcon icon="tabler-check" size="22" />
                </VBtn>
              </VCol>
              <VCol v-show="isRejectBtnVisible(item)" cols="4">
                <VBtn variant="tonal" color="error" size="38" @click="openRejectDialog(item.id)">
                  <VIcon icon="tabler-x" size="22" />
                </VBtn>
              </VCol>
            </VRow>
          </template>
          <template #item.created_at="{ item }">
            {{ formatTableDate(item.created_at) }}
          </template>
          <template #item.updated_at="{ item }">
            {{ formatTableDate(item.updated_at) }}
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
    <DocumentDetailDialog v-model="selectedDocument" v-model:active="detailDialog" v-model:mode="detailMode" />
  </VContainer>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import DocumentDetailDialog from '@/components/DocumentDetailDialog.vue';
import TitlePage from '@/components/TitlePage.vue';
import { getColorFromRisk, templateWithDetail } from '@/config/risk';
import { getColorFromStatus } from '@/config/status';
import { useAuthStore } from '@/store/auth';
import { useDocumentStore } from '@/store/document';
import { formatTableDate } from '@/utils/formatter';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const headers = [
  {
    title: 'Title', key: 'product_name', sortable: true
  },
  {
    title: 'Created', key: 'created_at', sortable: true
  },
  {
    title: 'Updated', key: 'updated_at', sortable: true
  },
  {
    title: 'Status', key: 'action', sortable: false
  },
  {
    title: 'Action', key: 'actions', sortable: false
  },
]

const data = ref([])
const totalData = ref(0)

const defaultQuery = {
  orderBy: 'created_at',
  orderDirection: 'desc',
  take: 10,
  skip: 0
}
const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const authStore = useAuthStore()
const detailDialog = ref(false)
const detailMode = ref('overall')
const query = ref({
  ...defaultQuery,
})

watch(detailDialog, (val) => {
  if (!val) {
    fetchDocuments()
  }
})

const page = computed({
  get() {
    return (query.value.skip / query.value.take) + 1
  },
  set(v) {
    query.value.skip = (v - 1) * query.value.take
  }
})

const take = ref(10)

const selectedDocument = ref({ ...templateWithDetail })

const currentCategory = computed(() => {
  const categoryParam = route?.params?.category ?? ''
  return categoryParam.split('-')[0]
})

const isEditBtnVisible = function (document) {
  return authStore.isAuthor && (document.action === 'draft' || document.action === 'reject')
}

const isApproveBtnVisible = function (document) {
  return authStore.isReviewer && document.action === 'submit'
}

const isRejectBtnVisible = function (document) {
  return authStore.isReviewer && document.action === 'submit'
}

watch(query, () => {
  fetchDocuments()
}, { deep: true })

onMounted(() => {
  fetchDocuments()
})

const fetchDocuments = function () {
  documentStore.fetchDocuments({ ...query.value, take: query.value.take === -1 ? 9999 : query.value.take })
    .then(res => {
      data.value = documentStore.documentResponseToTable(res.data)
      totalData.value = res.extras.total
    })
}

const fetchDocumentById = function (id) {
  documentStore.fetchDocumentById({ id })
    .then(res => {
      selectedDocument.value = { ...res }
    })
}
const openDetailDialog = function (id) {
  fetchDocumentById(id)
  detailDialog.value = true
  detailMode.value = 'overall'
}

const openApproveDialog = function (id) {
  fetchDocumentById(id)
  detailDialog.value = true
  detailMode.value = 'approve'
}

const openRejectDialog = function (id) {
  fetchDocumentById(id)
  detailDialog.value = true
  detailMode.value = 'reject'
}

const openEdit = function (id) {
  router.push(`/fra-document/update-document/${id}`)
}

const onUpdateOptions = function (options) {
  if (options.sortBy.length > 0) {
    query.value.orderBy = options.sortBy[0].key
    query.value.orderDirection = options.sortBy[0].order
  }
}
</script>
