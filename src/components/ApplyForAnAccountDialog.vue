<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Apply An Account">
      <VCardText>
        <VForm @submit.prevent="apply">
          <AppTextField v-model="form.nik" placeholder="Input your NIK..." label="NIK" />
          <div class="my-2">
            <div v-show="onLoadingCheckLDAP">
              <VProgressCircular indeterminate :size="20" :width="2" />
              Checking user's nik
            </div>
            <div v-show="!!form.nik && !onLoadingCheckLDAP && isUserLDAP">
              <VIcon size="20" icon="tabler-user-check" />
              <span class="text-success">Verified user ldap</span>
            </div>
            <div v-show="!!form.nik && !onLoadingCheckLDAP && !isUserLDAP">
              <VIcon size="20" icon="tabler-user" />
              <span class="text-warning">Not user ldap</span>
            </div>
          </div>
          <AppTextField v-show="!!form.nik && !onLoadingCheckLDAP && !isUserLDAP" v-model="form.name"
            placeholder="Input your Name..." label="Name" />
          <AppTextField v-show="!!form.nik && !onLoadingCheckLDAP && !isUserLDAP" v-model="form.email"
            placeholder="Input your Email..." label="Email" />
          <AppTextField v-show="!!form.nik && !onLoadingCheckLDAP && !isUserLDAP" v-model="form.password"
            placeholder="Input your Password..." label="Password" />
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
const onLoadingCheckLDAP = ref(false)
const isUserLDAP = ref(false)
const form = ref({
  nik: '',
  email: '',
  name: '',
  password: '',
})

watchEffect(() => {
  dialogValue.value = props.active
})

const close = function () {
  emits('update:active', false)
  reset()
}

const apply = function () {
  if (!form.value.nik) {
    appStore.openSnackbar({
      message: "Please fill all the field",
      color: 'error',
      timeout: 1000
    })
    return
  }
  if ((!!form.value.nik && !onLoadingCheckLDAP.value && !isUserLDAP.value) && Object.values(form.value).some(attr => !attr)) {
    appStore.openSnackbar({
      message: "Please fill all the field",
      color: 'error',
      timeout: 1000
    })
    return
  }
  loadingApply.value = true
  userStore.postUserRegistrationApply({ ...form.value })
    .then(() => {
      appStore.openSnackbar({
        message: "Successfully Apply an Account",
        color: 'success',
        timeout: 1000
      })
      // close()
    })
    .catch(onCatchDocument)
    .finally(() => {
      loadingApply.value = false
    })
}

const reset = function () {
  form.value = {
    nik: '',
    email: '',
    name: '',
    password: '',
  }
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

const checkUserLDAP = async function () {
  onLoadingCheckLDAP.value = true
  return userStore.postCheckUserLDAP({
    nik: form.value.nik
  })
    .then(() => {
      isUserLDAP.value = true
    })
    .catch(() => {
      isUserLDAP.value = false
    })
    .finally(() => {
      onLoadingCheckLDAP.value = false
    })
}

const nikDebounce = ref(0)

watch(() => form.value.nik, (v) => {
  if (v) {
    isUserLDAP.value = false
    onLoadingCheckLDAP.value = true
    clearTimeout(nikDebounce.value)
    nikDebounce.value = setTimeout(checkUserLDAP, 700)
  }
})

watch(() => !!form.value.nik && !onLoadingCheckLDAP.value && !isUserLDAP.value, () => {
  form.value.name = ''
  form.value.email = ''
  form.value.password = ''
})
</script>
