<template>
  <div class="homepage pt-4">
    <VContainer>
      <VRow class="px-4">
        <VCol>
          <div class="text-h3">FRA Online</div>
          <div>Fraud Risk Assessment Online </div>
        </VCol>
        <VCol class="d-flex justify-end">
          <UserProfile />
        </VCol>
      </VRow>
    </VContainer>
    <VContainer>

      <VTextField v-bind="$attrs" v-model="search" placeholder="Search" class="search-input  my-3" density="comfortable"
        @keyup.enter="doSearch">
        <template #prepend-inner>
          <VIcon icon="tabler-search" size="23" />
        </template>
      </VTextField>
    </VContainer>

    <VContainer>
      <VCard>
        <VCardText>
          <div class="text-h4">Menus</div>
          <div class="mb-3">Lorem ipsum dolor sit amet.</div>
          <VRow class="justify-space-evenly">
            <VCol cols="4">
              <HomeCard title="Document FRA"
                subtitle1="Menu yang menampilkan List Dokumen FRA Product Digital Connectivity"
                subtitle2="Pencarian Dokumen Repository FRA" :img="imageCard1" :to="{ name: 'dashboard' }" />
            </VCol>
            <VCol cols="4">
              <HomeCard title="Tracking Process FRA"
                subtitle1="Menu yang menampilkan tracking process dokumen FRA mulai dari Submit sampai Sign"
                subtitle2="Checklist Tracking Process" :img="imageCard2" :to="{ name: 'tracking-process-fra' }" />
            </VCol>
            <VCol v-if="authStore.isSuperadmin" cols="4">
              <HomeCard title="Account Request" subtitle1="Menu yang menampilkan Account pada aplikasi FRA"
                subtitle2="Account FRA" :img="imageCard3" :to="{ name: 'account-request' }" />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VContainer>
  </div>
</template>

<script setup>
import HomeCard from '@/components/CardHome.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';
import { useAuthStore } from '@/store/auth';
import imageCard1 from '@images/pages/home-page-document-fra.png';
import imageCard3 from '@images/pages/home-page-monitoring-evaluation.png';
import imageCard2 from '@images/pages/home-page-tracking-process-fra.png';
import { useRouter } from 'vue-router';

definePage({ meta: { layout: 'blank-auth' } })

const router = useRouter()
const authStore = useAuthStore()

const search = ref('')

const doSearch = function () {
  router.push({ path: '/search', query: { s: search.value } })
}
</script>

<style lang="scss" scoped>
.homepage {
  background-color: #FFFAFA;
}

@media (prefers-color-scheme: dark) {
  .homepage {
    background-color: rgb(var(--v-theme-surface));
  }
}

.search-input {
  border-radius: 0.375rem !important;
  background-color: rgb(var(--v-theme-surface));
}
</style>
