<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close" />

    <!-- Dialog Content -->
    <VCard title="Upload New Assessment">
      <VCardText>
        <div class="w-full h-auto relative mb-3">
          <div ref="dropZoneRef" class="cursor-pointer" @click="() => open()">
            <div v-if="fileData.length === 0"
              class="d-flex flex-column justify-center align-center gap-y-3 px-6 py-10 border-dashed drop-zone">
              <IconBtn variant="tonal" class="rounded-sm">
                <VIcon icon="tabler-upload" />
              </IconBtn>
              <div class="text-base text-high-emphasis font-weight-medium">
                Drop files here or click to upload
              </div>
              <span class="text-disabled">or</span>

              <VBtn variant="tonal">
                Browse Files
              </VBtn>
            </div>

            <div v-else class="d-flex justify-center align-center gap-3 pa-8 border-dashed drop-zone flex-wrap">
              <VRow class="match-height w-100">
                <template v-for="(item, index) in fileData" :key="index">
                  <VCol cols="12">
                    <VCard :ripple="false" border>
                      <VCardText class="d-flex flex-column" @click.stop>
                        <VImg :src="item.url" width="200px" height="150px" class="w-100 mx-auto" />
                        <div class="mt-2">
                          <span class="clamp-text text-wrap">
                            {{ item.file.name }}
                          </span>
                          <span>
                            {{ item.file.size / 1000 }} KB
                          </span>
                        </div>
                      </VCardText>
                      <VSpacer />
                      <VCardActions>
                        <VBtn variant="outlined" block @click.stop="fileData.splice(index, 1)">
                          Remove File
                        </VBtn>
                      </VCardActions>
                    </VCard>
                  </VCol>
                </template>
              </VRow>
            </div>
          </div>
        </div>
        <a class="download-template" href="/template/FRA Document Template.xlsx">
          <VIcon icon="tabler-upload" />
          FRA Document Template.xlsx
        </a>
        <AppSelect v-model="category" class="my-5 category-field" :items="categoryOptions" label="Category" />
      </VCardText>

      <VCardText class="d-flex justify-end actions">
        <VBtn color="secondary" @click="cancel">
          Cancel
        </VBtn>
        <VBtn @click="upload" :loading="isUploadLoading">
          Upload
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { useAppStore } from '@/@core/stores/app';
import { getUploadMappingFieldActualFieldRisk } from '@/config/document';
import { useDocumentStore } from '@/store/document';
import {
  useDropZone,
  useFileDialog,
  useObjectUrl,
} from '@vueuse/core';
import { watch, watchEffect } from 'vue';
import { read, utils } from 'xlsx';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const appStore = useAppStore()
const documentStore = useDocumentStore()

const isUploadLoading = ref(false)
const dropZoneRef = ref()
const fileData = ref([])
const category = ref('')
const fileName = ref('')
const risks = ref([])
const categoryOptions = [
  'communication',
  'datacomm',
  'wireless',
  'internet',
]
const { open, onChange, reset: resetDropzone } = useFileDialog({ accept: '*', multiple: false })
function onDrop(DroppedFiles) {
  DroppedFiles?.forEach(file => {
    // if (file.type.slice(0, 6) !== 'image/') {
    //   alert('Only image files are allowed')

    //   return
    // }
    fileData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  })
}
onChange(selectedFiles => {
  if (!selectedFiles)
    return
  for (const file of selectedFiles) {
    fileData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
    convertToJson(file)

  }
})

watch(() => props.active, (val) => {
  if (val) {
    useDropZone(dropZoneRef, onDrop)
  }
})

const dialogValue = ref(false)

watchEffect(() => {
  dialogValue.value = props.active
})

const emits = defineEmits(['update:active'])

const upload = function () {
  const payload = getPayload(fileName.value, risks.value, category.value, 'submit')
  if (fileData.value.length < 1) {
    appStore.openSnackbar({
      message: "Uploaded file is required",
      timeout: 1000,
      color: 'warning'
    })
  } else {
    // do upload
    isUploadLoading.value = true
    documentStore.submitDocument(payload)
      .then(() => {
        appStore.openSnackbar({
          message: "Successfuly upload file",
          timeout: 1000,
          color: 'success'
        })
        emits('update:active', false)
        reset()
      })
      .catch(onCatchDocument)
      .finally(() => {
        isUploadLoading.value = false
      })
  }

}

const onCatchDocument = function (err) {
  switch (err.status) {
    case 400:
      appStore.openSnackbar({
        message: "Some field still missing.",
        timeout: 4000,
        color: 'error'
      })
      break;
    case 409:
      appStore.openSnackbar({
        message: "Your document submission is incompatible due to the use of an outdated version.",
        timeout: 4000,
        color: 'error'
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

const close = function () {
  emits('update:active', false)
}

const cancel = function () {
  reset()
  close()
}

const reset = function () {
  fileData.value = []
  resetDropzone()
}



const convertToJson = async (file) => {
  const filenameArray = file.name.split(".")
  filenameArray.splice(filenameArray.length - 1, 1)
  const filename = filenameArray.join(".")
  const data = await file.arrayBuffer()
  const workbook = read(data)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const rawData = utils.sheet_to_json(worksheet)
  rawData.splice(0, 2)

  const sanitizedRiskData = rawData.reduce((pre, curr) => {
    const riskData = {}
    Object.entries(curr).forEach(([key, value]) => {
      riskData[getUploadMappingFieldActualFieldRisk(key)] = value
    })
    pre.push(riskData)
    return pre
  }, [])
  fileName.value = filename
  risks.value = sanitizedRiskData
}

const getPayload = function (fileName, risks, category, action) {
  const payload = {
    product_name: fileName,
    category,
    risks,
    action
  }
  return payload
}

</script>

<style lang="scss" scoped>
.download-template {
  color: rgb(var(--v-theme-primary));
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 4px;
}

.actions {
  gap: 10px;
}
</style>
