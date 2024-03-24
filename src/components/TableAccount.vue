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
        <VRow style="min-width: 125px;">
          <VCol v-if="item.status === 'reject'">
            <VBtn variant="tonal" color="success" size="38" @click="openDialogApprove(item.id)">
              <VIcon icon="tabler-check" size="22" />
            </VBtn>
          </VCol>
          <VCol v-if="item.status === 'approve'">
            <VBtn variant="tonal" color="warning" size="38" @click="openDialogEdit(item)">
              <VIcon icon="tabler-edit" size="22" />
            </VBtn>
          </VCol>
          <VCol v-if="item.status === 'approve'">
            <VBtn variant="tonal" color="error" size="38" @click="deleteHandler(item.id)">
              <VIcon icon="tabler-trash" size="22" />
            </VBtn>
          </VCol>
        </VRow>
      </template>
    </VDataTableServer>
    <AccountRequestApproveDialog v-model:active="approveDialog" @approve="approveHandler" />
    <AccountEditDialog v-model:active="editDialog" :user="selectedUser" @submit="editHandler" />
  </VCard>
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import { useUserStore } from '@/store/user';
import { onMounted, watch } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import AccountEditDialog from './AccountEditDialog.vue';
import AccountRequestApproveDialog from './AccountRequestApproveDialog.vue';


const userStore = useUserStore()
const appStore = useAppStore()

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
    title: 'Role', key: 'role', sortable: true
  },
  {
    title: 'Unit', key: 'unit', sortable: true
  },
  {
    title: 'STATUS', key: 'status', sortable: false
  },
  {
    title: 'ACTION', key: 'action', sortable: false
  },
]

const approveDialog = ref(false)
const editDialog = ref(false)
const selectedUserId = ref(0)
const selectedUser = ref({})
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

const approveHandler = async function (unit) {
  const id = selectedUserId.value

  return userStore.postUserRegistrationApprove({ id, unit })
    .then(() => {
      fetchUsers()
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

const deleteHandler = async function (id) {
  return userStore.removeUser(id)
    .then(() => {
      fetchUsers()
      appStore.openSnackbar({
        message: "User successfully deleted.",
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

const editHandler = async function (form) {
  const id = selectedUserId.value
  const payload = { id, ...form }

  return userStore.updateUser(payload)
    .then(() => {
      fetchUsers()
      appStore.openSnackbar({
        message: "User successfully updated.",
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

const openDialogEdit = function (user) {
  selectedUserId.value = user.id
  selectedUser.value = user
  editDialog.value = true
}

const openDialogApprove = function (id) {
  selectedUserId.value = id
  approveDialog.value = true
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

</script>./AccountRequestReject2Dialog.vue
