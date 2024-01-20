<template>
  <VCard>
    <VRow class="d-flex justify-space-between px-4 pt-4">
      <VCol cols="3">
        <AppSelect v-model="selectedStatus" class="mb-4" :items="options" />
      </VCol>
      <VCol cols="4">
        <AppTextField v-model="search" density="compact" placeholder="Search ..." append-inner-icon="tabler-search"
          single-line hide-details dense outlined />
      </VCol>
    </VRow>
    <VDataTable :headers="headers" :items="data" :items-per-page="5">
      <template #item.status="{ item }">
        <span :class="`text-${colorStatusMap[item.status]}`"> {{ item.status }}</span>
      </template>
      <template #item.action="{ item }">
        <VRow>
          <VCol v-if="item.status === 'Rejected'" cols="4">
            <VBtn variant="tonal" color="success" size="38">
              <VIcon icon="tabler-check" size="22" />
            </VBtn>
          </VCol>
          <VCol v-if="item.status === 'Accepted'" cols="4">
            <VBtn variant="tonal" color="error" size="38">
              <VIcon icon="tabler-trash" size="22" />
            </VBtn>
          </VCol>
        </VRow>
      </template>
    </VDataTable>
  </VCard>
</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

const options = [
  'All Status',
  'Accepted',
  'Rejected'
]
const headers = [
  {
    title: 'No', key: 'no', sortable: false
  },
  {
    title: 'NAME', key: 'name', sortable: false
  },
  {
    title: 'NIK', key: 'nik', sortable: false
  },
  {
    title: 'EMAIL', key: 'email', sortable: false
  },
  {
    title: 'STATUS', key: 'status', sortable: false
  },
  {
    title: 'ACTION', key: 'action', sortable: false
  },
]

const data = [
  {
    no: 1,
    name: 'John Doe',
    nik: 1234567,
    status: 'Accepted',
    email: 'john@doe.com'
  },
  {
    no: 2,
    name: 'John Doe',
    nik: 1234567,
    status: 'Accepted',
    email: 'john@doe.com'
  },
  {
    no: 3,
    name: 'John Doe',
    nik: 1234567,
    status: 'Rejected',
    email: 'john@doe.com'
  },
  {
    no: 4,
    name: 'John Doe',
    nik: 1234567,
    status: 'Rejected',
    email: 'john@doe.com'
  },
  {
    no: 5,
    name: 'John Doe',
    nik: 1234567,
    status: 'Accepted',
    email: 'john@doe.com'
  },
]

const colorStatusMap = {
  'Accepted': 'success',
  'Rejected': 'error'
}
const selectedStatus = ref('All Status')
</script>
