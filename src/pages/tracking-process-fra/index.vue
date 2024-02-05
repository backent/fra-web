<template>
  <div>

    <VContainer>
      <VRow class="flex-column" style="gap: 30px;">
        <div class="text-h3 mb-5">Tracking Process FRA</div>

        <div>
          <div class="mb-2">Enter a document name to view tracking</div>
          <VTextField v-model="searchText" v-bind="$attrs" placeholder="Enter document name..." class="search-input mb-5"
            density="comfortable" variant="solo">
            <template #prepend-inner>
              <VIcon icon="tabler-clipboard" size="25" />
            </template>
          </VTextField>
        </div>

        <div v-show="result.length > 0">
          <div class="mb-2">Search Result</div>
          <VList>
            <VListItem v-for="item in result" :key="item.id">
              <div class="result-item">
                <span>{{ item.title }}</span>
                <VBtn variant="outlined" @click="onCheckHandler(item)">
                  Check
                </VBtn>
              </div>
            </VListItem>
          </VList>
        </div>
      </VRow>
      <VRow class="flex-column">
        <TitlePage :primary-text="selectedPeriode.text" secondary-text="Periode" />
        <VCard>
          <VCardText>
            <AppSelect v-model="selectedPeriode" class="periode-options" :items="periodeOptions" label="Choose Periode"
              placeholder="Select Item" item-title="text" return-object />
            <VDivider class="my-5" />
            <VDataTableServer :headers="headers" :items="data" v-model:items-per-page="query.take" v-model:page="page"
              :items-length="totalData" @update:options="onUpdateOptions">
              <template #item.no="{ index }">
                {{ ((page - 1) * query.take) + index + 1 }}
              </template>
              <template #item.action="{ value }">
                <span class="text-capitalize" :class="`text-${getColorStatus(value, authStore.currentUser.role)}`">{{
                  getStatus(value, authStore.currentUser.role) }}</span>
              </template>
              <template #item.created_at="{ item }">
                {{ formatTableDate(item.created_at) }}
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>

      </VRow>
      <VDialog v-model="dialogTracker" width="500">

        <!-- Dialog close btn -->
        <DialogCloseBtn @click="dialogTracker = !dialogTracker" />

        <VCard :title="selectedTracker.title">
          <VCardText>
            <VTimeline truncate-line="both" align="start" side="end" line-color="primary" density="compact"
              class="v-timeline-density-compact">
              <VTimelineItem v-for="(item, idx) in selectedTracker.tracker" :key="idx"
                :dot-color="idx === selectedTracker.tracker.length - 1 ? 'secondary' : 'primary'" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <div class="app-timeline-title">
                    {{ item.title }}
                  </div>
                  <div class="app-timeline-meta">
                    {{ formatCompleteTime(item.timestamp) }}
                  </div>
                </div>
                <p class="d-flex flex-column app-timeline-text mb-0">
                  {{ item.subtitle }}
                  <VBtn v-if="item.type === 'upload'" class="tracker-action-button" variant="outlined" size="small">
                    Upload Document
                  </VBtn>
                <div v-else-if="item.type === 'upload-done' || item.type === 'signin-onprocess'"
                  class="plain-action-button">
                  {{ item.filename }}
                </div>
                </p>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VDialog>

    </VContainer>
  </div>
</template>

<script setup>
import { getColorStatus, getStatus } from '@/config/document';
import { useAuthStore } from '@/store/auth';
import { useDocumentStore } from '@/store/document';
import { formatCompleteTime, formatTableDate } from '@/utils/formatter';
import { onMounted, watch } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const documentStore = useDocumentStore()
const authStore = useAuthStore()
const searchText = ref('')
const searchingDebounce = ref(null)
const dialogTracker = ref(false)
const selectedTracker = ref({
  tracker: []
})
const totalData = ref(0)

const defaultQuery = {
  orderBy: 'created_at',
  orderDirection: 'desc',
  take: 10,
  skip: 0,
  name: '',
  month: 0
}

const query = ref({
  ...defaultQuery,
})

const result = ref([])

const periodeOptions = [{ text: 'All', value: 0, }, { text: 'January', value: 1, }, { text: 'February', value: 2, }, { text: 'March', value: 3, }, { text: 'April', value: 4, }, { text: 'May', value: 5, }, { text: 'June', value: 6, }, { text: 'July', value: 7, }, { text: 'August', value: 8, }, { text: 'September', value: 9, }, { text: 'October', value: 10, }, { text: 'November', value: 11, }, { text: 'December', value: 12, },]

const headers = [
  {
    title: 'No', key: 'no', sortable: false
  },
  {
    title: 'DOCUMENT NAME', key: 'product_name', sortable: false
  },
  {
    title: 'DATE', key: 'created_at', sortable: false
  },
  {
    title: 'STATUS', key: 'action', sortable: false
  },
]

const data = ref([])

const selectedPeriode = ref({
  text: 'All',
  value: 0,
})


onMounted(() => {
  fetchMonitoringDocuments()
})

const page = computed({
  get() {
    return (query.value.skip / query.value.take) + 1
  },
  set(v) {
    query.value.skip = (v - 1) * query.value.take
  }
})


const onChangeHandler = function (v) {
  if (searchingDebounce.value) {
    clearTimeout(searchingDebounce.value)
  }
  searchingDebounce.value = setTimeout(() => {
    fetchTrackingDocuments(v)
    query.value = {
      ...query.value,
      name: searchText.value.trim(),
      skip: 0
    }

  }, 700)
}

const onCheckHandler = function (item) {
  selectedTracker.value = item
  dialogTracker.value = true
}


const fetchMonitoringDocuments = function () {
  documentStore.fetchMonitoringDocuments({ ...query.value, take: query.value.take === -1 ? 9999 : query.value.take })
    .then(res => {
      data.value = documentStore.documentResponseToMonitoringTable(res.data)
      totalData.value = res.extras.total
    })
}

const onUpdateOptions = function (options) {
  if (options.sortBy.length > 0) {
    query.value.orderBy = options.sortBy[0].key
    query.value.orderDirection = options.sortBy[0].order
  }
}

const fetchTrackingDocuments = function (name) {
  documentStore.fetchTrackingDocuments({ name })
    .then(data => {
      result.value = documentStore.trackingResponseToTrackingList(data)
    })
}


watch(searchText, (v) => {
  onChangeHandler(v)
})
watch(query, () => {
  fetchMonitoringDocuments()
}, { deep: true })
watch(selectedPeriode, (v) => {
  query.value = {
    ...query.value,
    month: v.value
  }
})
</script>

<style lang="scss" scoped>
:deep(.v-field) {
  border-radius: 100px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 0;
}

:deep(.result-item button) {
  border-radius: 100px;
}

:deep(.tracker-action-button) {
  max-width: 160px;
}

:deep(.plain-action-button) {
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
  text-decoration: underline;
}

.periode-options {
  max-width: 300px;
  background-color: rgb(var('--v-theme-surface'));

}

:deep(.periode-options .v-input) {
  background-color: rgb(var(--v-theme-surface));
}
</style>
