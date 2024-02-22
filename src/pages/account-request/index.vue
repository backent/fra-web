<template>
  <div>
    <VContainer>
      <VRow class="flex-column mb-5">
        <div class=" text-h3 mb-5">Account Request
        </div>
      </VRow>

      <VRow>
        <VCol cols="2">
          <VTabs v-model="activeTab" direction="vertical" class="v-tabs-pill disable-tab-transition">
            <VTab v-for="(tabItem, index) in tabsData" :key="index">
              {{ tabItem.title }}
              <VDivider />
              <VBadge v-show="!isNaN(parseInt(tabItem.count, 10))" :content="tabItem.count" :offset-x="-18"
                :offset-y="4" />
            </VTab>
          </VTabs>
        </VCol>
        <VCol cols="10">
          <VWindow v-model="activeTab" class="disable-tab-transition" :touch="false">
            <VWindowItem>
              <TableAccount />
            </VWindowItem>
            <VWindowItem>
              <TablePendingAccountRequest />
            </VWindowItem>
          </VWindow>

        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>


<script setup>
import { defineAsyncComponent } from 'vue';


const TablePendingAccountRequest = defineAsyncComponent(() => import('@/components/TablePendingAccountRequest.vue'))
const TableAccount = defineAsyncComponent(() => import('@/components/TableAccount.vue'))

const tabsData = [
  { title: 'List Account' },
  { title: 'Request' }
]
const activeTab = ref(null)
</script>
