<template>
  <VContainer>
    <VRow class="flex-column mb-2">
      <div class=" text-h3 mb-5">Search Result
      </div>
    </VRow>
    <VRow>
      <VCol>
        <div v-show="onLoading" style="min-height: 60vh; display: flex; justify-content: center; align-items: center;">
          <VProgressCircular indeterminate />
        </div>

        <div v-show="!onLoading && searchResult.length === 0">
          <VCardText class="h-100" style="margin-top: 30vh;">
            <div
              class="app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100">
              <VIcon size="75" icon="tabler-file-x" />
              <div class="d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3">
                <span>No Result For </span>
                <span>"{{ searchQuery }}"</span>
              </div>

              <slot name="noDataSuggestion" />
            </div>
          </VCardText>
        </div>

        <div v-show="!onLoading">
          <div v-for="(item, idx) in searchResult" :key="idx">
            <VCard>
              <VCardText>
                <SearchResult :item="item" @onListItemClick="handleSearchItemClick(item)" />
              </VCardText>
            </VCard>
            <VDivider class="my-2" />
          </div>
        </div>
      </VCol>
    </VRow>
    <DocumentDetailDialog v-model="selectedDocument" v-model:active="detailDialog" v-model:mode="detailMode" />
  </VContainer>
</template>

<script setup>
import DocumentDetailDialog from '@/components/DocumentDetailDialog.vue';
import { templateWithDetail } from '@/config/risk';
import SearchResult from '@/layouts/components/SearchResult.vue';
import { useDocumentStore } from '@/store/document';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const documentStore = useDocumentStore()

const onLoading = ref(false)
const searchResult = ref([])
const selectedDocument = ref({ ...templateWithDetail })
const detailMode = ref('overall')
const detailDialog = ref(false)

onMounted(() => {
  fetchResults()
})

const searchQuery = computed(() => {
  return route?.query?.s ?? ''
})

const fetchResults = async () => {
  if (!searchQuery.value) {
    searchResult.value = []
    return
  }
  const query = {
    search: searchQuery.value,
    take: 50,
    skip: 0
  }
  onLoading.value = true
  return documentStore.fetchDocumentSearchGlobal(query)
    .then(res => {
      searchResult.value = res.data
    })
    .finally(() => {
      onLoading.value = false
    })

}

const handleSearchItemClick = item => {
  fetchDocumentById(item.id)
  detailDialog.value = true
}

const fetchDocumentById = function (id) {
  documentStore.fetchDocumentById({ id })
    .then(res => {
      selectedDocument.value = { ...res }
    })
}
</script>
