<template>
  <VContainer>
    <Breadcrumb class="mb-5" />
    <TitlePage primary-text="Document" secondary-text="List" />

    <VCard>
      <VCardText>
        <VDataTableServer :headers="headers" :items="data" v-model:items-per-page="query.take" v-model:page="query.page"
          :items-length="data.length" @update:options="onUpdateOptions">
          <template #item.risk_level="{ value }">
            <VChip :color="getColorFromRisk(value)" variant="elevated">
              <span class="text-capitalize">{{ value }}</span>
            </VChip>
          </template>
          <template #item.status="{ value }">
            <span class="text-capitalize" :class="`text-${getColorFromStatus(value)}`">{{ value }}</span>
          </template>
          <template #item.action="{ value }">
            <VRow>
              <VCol cols="4">
                <VBtn variant="tonel" color="info" size="38" @click="openDetailDialog()">
                  <VIcon icon="tabler-eye" size="22" />
                </VBtn>
              </VCol>
              <VCol cols="4">
                <VBtn variant="tonel" color="success" size="38" @click="openApproveDialog()">
                  <VIcon icon="tabler-check" size="22" />
                </VBtn>
              </VCol>
              <VCol cols="4">
                <VBtn variant="tonel" color="error" size="38" @click="openRejectDialog()">
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
    <DocumentDetailDialog v-model:active="detailDialog" v-model:mode="detailMode" />
  </VContainer>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import DocumentDetailDialog from '@/components/DocumentDetailDialog.vue';
import TitlePage from '@/components/TitlePage.vue';
import { getColorFromRisk } from '@/config/risk';
import { getColorFromStatus } from '@/config/status';
import { useDocumentStore } from '@/store/document';
import { formatTableDate } from '@/utils/formatter';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const headers = [
  {
    title: 'Title', key: 'risk_name', sortable: true
  },
  {
    title: 'Sumber Resiko', key: 'source_risk', sortable: true
  },
  {
    title: 'Risk Level', key: 'risk_level', sortable: false
  },
  {
    title: 'Created', key: 'created_at', sortable: false
  },
  {
    title: 'Updated', key: 'updated_at', sortable: false
  },
  {
    title: 'Status', key: 'status', sortable: false
  },
  {
    title: 'Action', key: 'action', sortable: false
  },
]

const data = ref([])

const defaultQuery = {
  orderBy: 'created_at',
  orderDirection: 'desc',
  take: 10,
  skip: 0
}
const route = useRoute()
const documentStore = useDocumentStore()
const detailDialog = ref(false)
const detailMode = ref('overall')
const query = ref({
  ...defaultQuery,
  page: 1
})

const take = ref(10)

const currentCategory = computed(() => {
  const categoryParam = route?.params?.category ?? ''
  return categoryParam.split('-')[0]
})

watch(query, () => {
  fetchDocuments()
}, { deep: true })

onMounted(() => {
  fetchDocuments()
})

const fetchDocuments = function () {
  documentStore.fetchDocuments(query.value)
    .then(res => {
      data.value = documentStore.documentResponseToTable(res)
    })
}

const openDetailDialog = function () {
  detailDialog.value = true
  detailMode.value = 'overall'
}

const openApproveDialog = function () {
  detailDialog.value = true
  detailMode.value = 'approve'
}

const openRejectDialog = function () {
  detailDialog.value = true
  detailMode.value = 'reject'
}

const onUpdateOptions = function (options) {
  if (options.sortBy.length > 0) {
    query.value.orderBy = options.sortBy[0].key
    query.value.orderDirection = options.sortBy[0].order
  }
}
</script>
