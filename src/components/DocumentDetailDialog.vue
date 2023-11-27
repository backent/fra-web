<template>
  <VDialog v-model="dialogValue" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard>
      <VCardTitle>
        <span class="title mr-3">Toll Fraud SLI</span>
        <VChip color="info" variant="elevated">
          <span class="text-capitalize">New</span>
        </VChip>
      </VCardTitle>
      <VCardText>
        <div class="d-flex gap-2 mb-5">
          <VChip label color="info">
            Internal & Eksternal
          </VChip>

          <VChip label color="warning">
            Dapat Diterima
          </VChip>

        </div>

        <div class="text-h5 mb-3">Deskripsi Risiko</div>

        <VRow>
          <VCol cols="2">
            Skema Fraud
          </VCol>
          <VCol cols="10">
            International revenue sharing fraud
          </VCol>
          <VCol cols="2">
            Motif Fraud
          </VCol>
          <VCol cols="10">
            Mendapatkan keuntungan finansial
          </VCol>
          <VCol cols="2">
            Teknik Fraud
          </VCol>
          <VCol cols="10">
            Hacking ONT Telkom kemudian melakukan panggilan ke nomor premium call cantik milik fraudster
          </VCol>
        </VRow>

        <VRow class="align-stretch standard-row mb-5">
          <VCol cols="6">
            <VCard class="card" title="Akar Penyebab:">
              <VCardText>
                1a. Kelemahan ONT tidak memiliki binding Voice <br>
                1b. Password SIP di OLT disimpan dalam mode clear text <br>
                1c. Menggunakan password default di ONT <br>
                1d. Level Firewall masih low <br>
                Kelemahan security di perangkat pelanggan
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="6">
            <VCard class="card" title="Control / Prosedure (Bisro):">
              <VCardText>
                1a. Membuat password berbeda-beda untuk setiap number (kombinasi karakter unik besar kecil, etc) <br>
                1b. Monitoring rutin ONT <br>
                1c. Peningkatan level firewall di ONT <br>
                2a. Perlu ditambahkan kebijakan demarkasi di buku produk <br>
                2b. Perlu ada kalusul di kontrak dengan pelanggan, jika terjadi penggilan dari sisi perangkat pelanggan
                maka sepenuhnya menjadi tanggung jawab pelanggan <br>
                Normally close SLI untuk pelanggan baru <br>
                Menginformasi ke DWS jika terjadi penghapusan tagihan akibat fraud
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <VRow class="mb-5">
          <VCol cols="2">
            <div class="text-h5">Dampak Kualitatif:</div>
          </VCol>
          <VCol cols="10">
            1. Kebocoran revenue <br>
            2. Reputasi Telkom di mata pelanggan
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <div class="text-h5 mb-3">Fraud Scemes Assessment</div>
        <VRow class="mb-5">
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Likelihood:</div>
            <VChip color="success">
              Very Low
            </VChip>
          </VCol>
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Impact:</div>
            <VChip color="error">
              Medium
            </VChip>
          </VCol>
          <VCol cols="4" class="d-flex align-center gap-5">
            <div class="mr-5">Risk Level:</div>
            <VChip color="warning">
              Low
            </VChip>
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <div class="text-h5 mb-3">Dampak Kualitatif:</div>
        <VRow class="mb-5">
          <VCol cols="2">
            Likelihood:
          </VCol>
          <VCol cols="10">
            1. Secara historis SLI Toll Fraud (ribuan record):4,92 (2017). 2,81(2018), 5,2(1019), 5,7(2020), 6,4(2021).
            <br>
            2. Mitigasi sudah dibuatkan dan diharapkan diterapkan secara ketat, sehingga diprediksi presentasi kemungkinan
            terjadi lebih kecil sekitar 0-5% dari volume total dalam satu periode
          </VCol>
          <VCol cols="2">
            Impact:
          </VCol>
          <VCol cols="10">
            1. Data historis dari tahun 2017
            s.d 2022 total potensial loss akibat fraud ini mencapai:1. SLI Toll Fraud (Miliar):3,22 (2017),
            1,85 (2018), 3,72 ( 2019), 3,7(2020), 5,4 (2021), 5,98
            (2022) <br>
            2. Namun demikian kami menilai impact yang besar akan terjadi pada ketidakpuasan pelanggan yang memicu
            diadakannya pertemuan pembahasan formal yang hasilnya dituangkan secara tertulis
          </VCol>
        </VRow>
        <VDivider class="mb-5" />
        <VCard class="mb-5">
          <VCardText>
            <div class="text-h5 mb-3">Rekomendasi:</div>
            Product bisa dilanjutkan dengan catatan seluruh cotrol sudah siap dan akan dilaksanakan
          </VCardText>
        </VCard>
        <div class="actions">
          <VDivider class="mb-5" />
          <div class="d-flex justify-end">
            <VBtn color="primary" @click="close()">
              Cancel
            </VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import { useAppStore } from '@/@core/stores/app';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active'])

const appStore = useAppStore()
const dialogValue = ref(false)
const loadingApply = ref(false)

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
}

const apply = function () {
  loadingApply.value = true
  setTimeout(() => {
    loadingApply.value = false
    appStore.openSnackbar({
      message: "Successfully Apply an Account",
      color: 'success',
      timeout: 1000
    })
    close()
  }, 1000)
}

</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}

.actions {
  position: sticky;
  bottom: 20px;

  background-color: rgba(var(--v-theme-surface), 0.8);
}
</style>
