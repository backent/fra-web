<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Apply An Account">
      <VCardText>
        <VForm @submit.prevent="apply">
          <AppTextField v-model="nik" placeholder="Input your NIK..." label="NIK" />
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn :loading="loadingApply" @click="apply()">
          Submit
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';
import { useAppStore } from '@/@core/stores/app';
import { useUserStore } from '@/store/user';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active'])

const userStore = useUserStore()
const appStore = useAppStore()
const dialogValue = ref(false)
const loadingApply = ref(false)
const nik = ref('')

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
  reset()
}

const apply = function () {
  if (!nik.value) {
    return
  }
  loadingApply.value = true
  userStore.postUserRegistrationApply({ nik: nik.value })
    .then(() => {
      appStore.openSnackbar({
        message: "Successfully Apply an Account",
        color: 'success',
        timeout: 1000
      })
      close()
    })
    .catch(onCatchDocument)
    .finally(() => {
      loadingApply.value = false
    })
}

const reset = function () {
  nik.value = ''
}

const onCatchDocument = function (err) {

  switch (err.status) {
    case 400:
      appStore.openSnackbar({
        message: "Account with this nik already applied or registered",
        color: 'error',
        timeout: 3000
      })
      break;
    case 500:
      appStore.openSnackbar({
        message: "There is something wrong on our server. Please contact your administrator.",
        timeout: 4000,
        color: 'error'
      })
      break;

    default:
      break;
  }
}
</script>
