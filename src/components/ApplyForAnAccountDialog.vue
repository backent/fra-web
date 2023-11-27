<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Apply An Account">
      <VCardText>
        <AppTextField placeholder="Input your NIK..." label="NIK" />
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
