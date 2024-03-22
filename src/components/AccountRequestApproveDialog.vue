<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Approve An Account">
      <VCardText>
        <VForm @submit.prevent="approve">
          <AppSelect v-model="unit" :items="categories.map(c => (c.charAt(0).toUpperCase() + c.slice(1)))"
            label="Unit" />
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn :disabled="!unit" @click="approve()">
          Approve
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import { categories } from '@/config/category';


const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active', 'approve'])
const dialogValue = ref(false)
const unit = ref('')

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
  reset()
}

const approve = function () {
  emits('approve', unit.value)
  close()
}

const reset = function () {
  unit.value = ''
}

</script>
