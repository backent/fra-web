<template>
  <VCard>
    <VRow class="d-flex justify-space-between px-4 pt-4">
      <VCol cols="3">
        <AppSelect v-model="query.status" class="mb-4" :items="options" item-title="text" item-value="value" />
      </VCol>
      <VCol cols="4">
        <AppTextField v-model="search" density="compact" placeholder="Search ..." append-inner-icon="tabler-search"
          single-line hide-details dense outlined />
      </VCol>
    </VRow>
    <VDataTableServer :headers="headers" :items="data" v-model:items-per-page="query.take" v-model:page="page"
      :items-length="totalData" @update:options="onUpdateOptions">
      <template #item.no="{ index }">
        {{ ((page - 1) * query.take) + index + 1 }}
      </template>
      <template #item.status="{ item }">
        <span :class="`text-${colorStatusMap[item.status]}`"> {{ textStatusMap[item.status] }}</span>
      </template>
      <template #item.action="{ item }">
        <VRow>
          <VCol v-if="item.status === 'reject'">
            <VBtn variant="tonal" color="success" size="38">
              <VIcon icon="tabler-check" size="22" />
            </VBtn>
          </VCol>
          <VCol v-if="item.status === 'approve'">
            <VBtn variant="tonal" color="error" size="38">
              <VIcon icon="tabler-trash" size="22" />
            </VBtn>
          </VCol>
        </VRow>
      </template>
    </VDataTableServer>
  </VCard>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { onMounted, watch } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';


const userStore = useUserStore()

const options = [
  {
    text: 'All Status',
    value: '',
  },
  {
    text: 'Accepted',
    value: 'approve',
  },
  {
    text: 'Rejected',
    value: 'reject',
  },
]
const headers = [
  {
    title: 'No', key: 'no', sortable: false
  },
  {
    title: 'NAME', key: 'name', sortable: true
  },
  {
    title: 'NIK', key: 'nik', sortable: true
  },
  {
    title: 'EMAIL', key: 'email', sortable: true
  },
  {
    title: 'STATUS', key: 'status', sortable: false
  },
  {
    title: 'ACTION', key: 'action', sortable: false
  },
]

const search = ref('')
const searchTimeout = ref(0)
const totalData = ref(0)

const defaultQuery = {
  orderBy: 'created_at',
  orderDirection: 'desc',
  take: 5,
  skip: 0,
  status: '',
  search: '',
}

const query = ref({
  ...defaultQuery,
})

const data = ref([])

const colorStatusMap = {
  'approve': 'success',
  'reject': 'error'
}

const textStatusMap = {
  'approve': 'Accepted',
  'reject': 'Rejected'
}

const page = computed({
  get() {
    return (query.value.skip / query.value.take) + 1
  },
  set(v) {
    query.value.skip = (v - 1) * query.value.take
  }
})


onMounted(() => {
  fetchUsers()
})

const fetchUsers = async function () {
  return userStore.fetchUsers({ ...query.value, take: query.value.take === -1 ? 9999 : query.value.take })
    .then(res => {
      data.value = userStore.userToTable(res.data)
      totalData.value = res.extras.total
    })
}

const onUpdateOptions = function (options) {
  if (options.sortBy.length > 0) {
    query.value.orderBy = options.sortBy[0].key
    query.value.orderDirection = options.sortBy[0].order
  }
}

watch(query, () => {
  fetchUsers()
}, { deep: true })

watch(search, (v) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    query.value.search = v
  }, 700)
})

</script>
