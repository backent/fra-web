<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Reject An Account">
      <VCardText>
        <VForm @submit.prevent="reject">
          Are you sure want to reject this account ?
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn @click="reject()">
          Reject
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>


const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active', 'reject'])
const dialogValue = ref(false)

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
}

const reject = function () {
  emits('reject')
  close()
}

</script>
