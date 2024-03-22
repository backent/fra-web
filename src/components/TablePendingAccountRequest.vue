<template>
  <VDataTableServer :headers="headers" :items="data" v-model:items-per-page="query.take" v-model:page="page"
    :items-length="totalData" @update:options="onUpdateOptions">
    <template #item.no="{ index }">
      {{ (query.take * (page - 1)) + index + 1 }}
    </template>
    <template #item.action="{ item }">
      <VRow>
        <VCol cols="4">
          <VBtn variant="tonal" color="success" size="38" @click="openApproveDialog(item.id)">
            <VIcon icon="tabler-check" size="22" />
          </VBtn>
        </VCol>
        <VCol cols="4">
          <VBtn variant="tonal" color="error" size="38" @click="openRejectDialog(item.id)">
            <VIcon icon="tabler-x" size="22" />
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </VDataTableServer>
  <AccountRequestApproveDialog v-model:active="approveDialog" @approve="approve" />
  <AccountRequestRejectDialog v-model:active="rejectDialog" @reject="reject" />
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import { useUserStore } from '@/store/user';
import { onMounted, watch } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import AccountRequestApproveDialog from './AccountRequestApproveDialog.vue';
import AccountRequestRejectDialog from './AccountRequestRejectDialog.vue';


const userStore = useUserStore()
const appStore = useAppStore()

const headers = [
  {
    title: 'No', key: 'no', sortable: false
  },
  {
    title: 'NAME', key: 'name', sortable: false
  },
  {
    title: 'NIK', key: 'nik', sortable: true
  },
  {
    title: 'EMAIL', key: 'email', sortable: false
  },
  {
    title: 'ACTION', key: 'action', sortable: false
  },
]

const approveDialog = ref(false)
const rejectDialog = ref(false)
const selectedAccountId = ref(0)
const data = ref([])
const totalData = ref(0)

const defaultQuery = {
  orderBy: 'created_at',
  orderDirection: 'desc',
  take: 5,
  skip: 0,
  status: 'pending'
}
const query = ref({
  ...defaultQuery
})
const page = computed({
  get() {
    return (query.value.skip / query.value.take) + 1
  },
  set(v) {
    query.value.skip = (v - 1) * query.value.take
  }
})

onMounted(() => {
  fetchUserRegistrations()
})

const fetchUserRegistrations = async function () {
  return userStore.fetchUserRegistrations({ ...query.value, take: query.value.take === -1 ? 9999 : query.value.take })
    .then(res => {
      data.value = userStore.userRegistrationToTable(res.data)
      totalData.value = res.extras.total
    })
}
const onUpdateOptions = function (options) {
  if (options.sortBy.length > 0) {
    query.value.orderBy = options.sortBy[0].key
    query.value.orderDirection = options.sortBy[0].order
  }
}

const approve = async function (unit) {
  const id = selectedAccountId.value
  return userStore.postUserRegistrationApprove({ id, unit })
    .then(() => {
      fetchUserRegistrations()
      appStore.openSnackbar({
        message: "User successfully approved.",
        timeout: 4000,
        color: 'success'
      })
    })
    .catch(() => {
      appStore.openSnackbar({
        message: "There is something wrong on our server. Please contact your administrator.",
        timeout: 4000,
        color: 'error'
      })
    })
}

const reject = async function () {
  const id = selectedAccountId.value
  return userStore.postUserRegistrationReject({ id })
    .then(() => {
      fetchUserRegistrations()
      appStore.openSnackbar({
        message: "User successfully rejected.",
        timeout: 4000,
        color: 'success'
      })
    })
    .catch(() => {
      appStore.openSnackbar({
        message: "There is something wrong on our server. Please contact your administrator.",
        timeout: 4000,
        color: 'error'
      })
    })
}

const openApproveDialog = function (id) {
  approveDialog.value = true
  selectedAccountId.value = id
}

const openRejectDialog = function (id) {
  rejectDialog.value = true
  selectedAccountId.value = id
}

watch(query, () => {
  fetchUserRegistrations()
}, { deep: true })

</script>./AccountRequestReject2Dialog.vue
