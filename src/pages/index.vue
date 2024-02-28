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

      <VTextField v-bind="$attrs" placeholder="Search" class="search-input  my-3" density="comfortable">
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
          <VRow>
            <VCol>
              <HomeCard title="Document FRA"
                subtitle1="Menu yang menampilkan List Dokumen FRA Product Digital Connectivity"
                subtitle2="Pencarian Dokumen Repository FRA" :img="imageCard1" :to="{ name: 'dashboard' }" />
            </VCol>
            <VCol>
              <HomeCard title="Tracking Process FRA"
                subtitle1="Menu yang menampilkan tracking process dokumen FRA mulai dari Submit sampai Sign"
                subtitle2="Checklist Tracking Process" :img="imageCard2" :to="{ name: 'tracking-process-fra' }" />
            </VCol>
            <VCol>
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
import imageCard1 from '@images/pages/home-page-document-fra.png';
import imageCard3 from '@images/pages/home-page-monitoring-evaluation.png';
import imageCard2 from '@images/pages/home-page-tracking-process-fra.png';

definePage({ meta: { layout: 'blank-auth' } })
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
