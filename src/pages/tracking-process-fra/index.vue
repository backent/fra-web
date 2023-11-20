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

        <div v-show="showResult">
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
import { formatCompleteTime } from '@/utils/formatter';
import { watch } from 'vue';


const searchText = ref('')
const searchingDebounce = ref(null)
const showResult = ref(false)
const dialogTracker = ref(false)
const selectedTracker = ref({
  tracker: []
})

watch(searchText, () => {
  onChangeHandler()
})
const onChangeHandler = function () {
  if (searchingDebounce.value) {
    clearTimeout(searchingDebounce.value)
  }
  searchingDebounce.value = setTimeout(fetchSearchDocument, 700)
}

const fetchSearchDocument = function () {
  console.log('searching ...')
  if (searchText.value) {
    showResult.value = true
  } else {
    showResult.value = false
  }
}

const onCheckHandler = function (item) {
  selectedTracker.value = item
  dialogTracker.value = true
}

const result = [
  {
    id: 1,
    title: 'FRA_SD Wan Fortinet_2023',
    tracker: [
      {
        title: 'FRA Submitted',
        subtitle: '970042',
        timestamp: 1700492127549,
        type: 'info'
      },
      {
        title: 'Review',
        subtitle: '880042',
        timestamp: 1700491127549,
        type: 'upload'
      },
      {
        title: 'Process Signing',
        subtitle: '',
        type: 'signing'
      },
    ]
  },
  {
    id: 2,
    title: 'FRA_SD Wan Fortinet_2025',
    tracker: [
      {
        title: 'FRA Submitted',
        subtitle: '970042',
        timestamp: 1700492127549,
        type: 'info'
      },
      {
        title: 'Review',
        subtitle: '880042',
        timestamp: 1700491127549,
        type: 'upload-done',
        filename: 'Dokumen FRA Internet_HSI B2B_2023.xlsx'
      },
      {
        title: 'Process Signing',
        subtitle: '',
        type: 'signin-onprocess',
        filename: 'Dokumen FRA Internet_HSI B2B_2023'
      },
    ]
  }
]
</script>

<style lang="scss" scoped>
:deep(.v-field) {
  border-radius: 100px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
