<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard :title="`Update ${form.name}'s Account`">
      <VCardText>
        <VForm @submit.prevent="submit">
          <AppTextField v-model="form.name" class="mb-3" label="Name" disabled />
          <AppTextField v-model="form.nik" class="mb-3" label="NIK" disabled />
          <AppTextField v-model="form.email" class="mb-3" label="Email" disabled />
          <AppTextField v-model="form.password" label="Password" :disabled="form.is_empty_password" />
          <VCheckbox v-model="form.is_empty_password" class="mb-3" label="Set password to empty" />
          <AppSelect v-model="form.role" :items="roles.map(c => (c.charAt(0).toUpperCase() + c.slice(1)))"
            label="Role" />
          <AppSelect v-model="form.unit" :items="categories.map(c => (c.charAt(0).toUpperCase() + c.slice(1)))"
            label="Unit" />
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn @click="submit()">
          Submit
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import { roles } from '@/config';
import { categories } from '@/config/category';
import { CapitalizeFirstLetter } from '@/utils/formatter';
import { watch } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['update:active', 'submit'])
const dialogValue = ref(false)
const unit = ref('')
const form = ref({
  name: '',
  nik: '',
  email: '',
  unit: '',
  role: '',
  password: '',
  is_empty_password: false
})

watchEffect(() => {
  dialogValue.value = props.active
})

watch(() => props.user, () => {
  form.value = { ...props.user, unit: CapitalizeFirstLetter(props.user.unit) }
})

watch(() => form.value.is_empty_password, (v) => {
  if (v) {
    form.value.password = ''
  }
})

const close = function () {
  emits('update:active', false)
  reset()
}

const submit = function () {
  emits('submit', { ...form.value, unit: form.value.unit.toLowerCase(), role: form.value.role.toLowerCase() })
  close()
}

const reset = function () {
  unit.value = ''
}

</script>
