<template>
  <VDataTable :headers="headers" :items="data" :items-per-page="5">
    <template #item.action="{ item }">
      <VRow>
        <VCol cols="4">
          <VBtn variant="tonal" color="success" size="38">
            <VIcon icon="tabler-check" size="22" />
          </VBtn>
        </VCol>
        <VCol cols="4">
          <VBtn variant="tonal" color="error" size="38">
            <VIcon icon="tabler-x" size="22" />
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </VDataTable>
</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

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
    title: 'ACTION', key: 'action', sortable: false
  },
]

const data = [
  {
    no: 1,
    name: 'John Doe',
    nik: 1234567,
    email: 'john@doe.com'
  },
  {
    no: 2,
    name: 'John Doe',
    nik: 1234567,
    email: 'john@doe.com'
  },
  {
    no: 3,
    name: 'John Doe',
    nik: 1234567,
    email: 'john@doe.com'
  },
  {
    no: 4,
    name: 'John Doe',
    nik: 1234567,
    email: 'john@doe.com'
  },
  {
    no: 5,
    name: 'John Doe',
    nik: 1234567,
    email: 'john@doe.com'
  },
]
</script>
