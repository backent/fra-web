<template>
  <VContainer>
    <Breadcrumb class="mb-5" />
    <TitlePage primary-text="Document" secondary-text="List" />

    <VCard>
      <VCardText>
        <VDataTable :headers="headers" :items="data" :items-per-page="5">
          <template #item.risk_level="{ value }">
            <VChip :color="getColorFromRisk(value)" variant="elevated">
              <span class="text-capitalize">{{ value }}</span>
            </VChip>
          </template>
          <template #item.status="{ value }">
            <span class="text-capitalize" :class="`text-${getColorFromStatus(value)}`">{{ value }}</span>
          </template>
          <template #item.action="{ value }" class="d-flex justify-around">
            <VBtn variant="tonel" color="info" size="38">
              <VIcon icon="tabler-eye" size="22" />
            </VBtn>
            <VBtn variant="tonel" color="success" size="38">
              <VIcon icon="tabler-check" size="22" />
            </VBtn>
            <VBtn variant="tonel" color="error" size="38">
              <VIcon icon="tabler-x" size="22" />
            </VBtn>
          </template>
          <template #item.created_at="{ item }">
            {{ formatTableDate(item.created_at) }}
          </template>
          <template #item.updated_at="{ item }">
            {{ formatTableDate(item.updated_at) }}
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import TitlePage from '@/components/TitlePage.vue';
import { getColorFromRisk } from '@/config/risk';
import { getColorFromStatus } from '@/config/status';
import { formatTableDate } from '@/utils/formatter';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = [
  {
    title: 'Title', key: 'title', sortable: false
  },
  {
    title: 'Sumber Resiko', key: 'source_risk', sortable: false
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

const data = [
  {
    title: 'Toll Fraud SLI',
    source_risk: 'Internal & Ekternal',
    risk_level: 'low',
    created_at: 1700492127549,
    updated_at: 1700492127549,
    status: 'new',
    action: 'action',
  },
  {
    title: 'Toll Fraud SLI',
    source_risk: 'Internal & Ekternal',
    risk_level: 'medium',
    created_at: 1700492127549,
    updated_at: 1700492127549,
    status: 'reject',
    action: 'action',
  },
  {
    title: 'Toll Fraud SLI',
    source_risk: 'Internal & Ekternal',
    risk_level: 'high',
    created_at: 1700492127549,
    updated_at: 1700492127549,
    status: 'reject',
    action: 'action',
  },
  {
    title: 'Toll Fraud SLI',
    source_risk: 'Internal & Ekternal',
    risk_level: 'high',
    created_at: 1700492127549,
    updated_at: 1700492127549,
    status: 'approved',
    action: 'action',
  },
  {
    title: 'Toll Fraud SLI',
    source_risk: 'Internal & Ekternal',
    risk_level: 'low',
    created_at: 1700492127549,
    updated_at: 1700492127549,
    status: 'approved',
    action: 'action',
  },
]


const route = useRoute()

const currentCategory = computed(() => {
  const categoryParam = route?.params?.category ?? ''
  return categoryParam.split('-')[0]
})

</script>
