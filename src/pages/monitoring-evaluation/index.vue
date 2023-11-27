<template>
  <div>
    <VContainer>
      <VRow class="flex-column mb-5" style="gap: 30px;">
        <div class="text-h3 mb-5">Monitoring & Evaluation</div>
        <AppSelect v-model="selectedPeriode" class="periode-options" :items="periodeOptions" label="Choose Periode"
          placeholder="Select Item" />
      </VRow>

      <VRow class="flex-column">
        <TitlePage :primary-text="selectedPeriode" secondary-text="Periode" />
        <VCard>
          <VCardText>
            <VDataTable :headers="headers" :items="data" :items-per-page="5">
              <template #item.date="{ item }">
                {{ formatTableDate(item.date) }}
              </template>
              <template #item.status="{ item }">
                <span :class="`text-${getColorFromStatus(item.status)}`" class="text-capitalize">
                  {{ item.status }}</span>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>

      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import TitlePage from '@/components/TitlePage.vue';
import { getColorFromStatus } from '@/config/status';
import { formatTableDate } from '@/utils/formatter';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const periodeOptions = [
  'All',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const headers = [
  {
    title: 'No', key: 'no', sortable: false
  },
  {
    title: 'DOCUMENT NAME', key: 'document_name', sortable: false
  },
  {
    title: 'DATE', key: 'date', sortable: false
  },
  {
    title: 'STATUS', key: 'status', sortable: false
  },
]

const data = [
  {
    no: '1',
    document_name: 'FRA_SD Wan Fortinet_2023',
    date: 1700492127549,
    status: 'Approved',
  },
  {
    no: '2',
    document_name: 'FRA_SD Wan Fortinet_2023',
    date: 1700492127549,
    status: 'On Progress',
  },
  {
    no: '3',
    document_name: 'FRA_SD Wan Fortinet_2023',
    date: 1700492127549,
    status: 'Approved',
  },
  {
    no: '4',
    document_name: 'FRA_SD Wan Fortinet_2023',
    date: 1700492127549,
    status: 'On Progress',
  },
  {
    no: '5',
    document_name: 'FRA_SD Wan Fortinet_2023',
    date: 1700492127549,
    status: 'Approved',
  }
]

const selectedPeriode = ref('All')
</script>

<style lang="scss" scoped>
.periode-options {
  max-width: 300px;
  background-color: rgb(var('--v-theme-surface'));

}

:deep(.periode-options .v-input) {
  background-color: rgb(var(--v-theme-surface));
}
</style>
