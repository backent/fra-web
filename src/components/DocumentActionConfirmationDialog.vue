<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog C ontent -->
    <VCard title="Confirmation">
      <VCardText>
        <VForm @submit.prevent="reject">
          Are you sure want to <span>{{ action.toLowerCase() }}</span> this document ?
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn @click="reject()">
          <span class="text-capitalize">{{ action }}</span>
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
  },
  action: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:active', 'clickAction'])
const dialogValue = ref(false)

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
}

const reject = function () {
  emits('clickAction')
  close()
}

</script>
