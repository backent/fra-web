<template>
  <VDialog v-model="dialogValue" width="500" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Likelihood (Fraud Schemes Assessment)">
      <VCardText>
        <AppSelect v-model="selectedMeasurement" class="mb-4" label="Pengukuran Kemungkinan" :items="measurement" />
        <AppSelect v-model="selectedLevel" class="mb-4" :items="levels" :disabled="!selectedMeasurement" />
        <div class="box-result">
          <div :class="`text-${selectedResult.color}`">{{ selectedResult.level }}</div>
          <div class="">{{ selectedResult.description }}</div>
        </div>
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn class="mr-3" variant="outlined" @click="close()">
          Cancel
        </VBtn>
        <VBtn :disabled="isSubmitDisabled" @click="submit()">
          Submit
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { likelihoodMeasurementAndLevels, likelihoodResult } from '@/config/fraud';
import { computed, watch } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active', 'submit'])

const dialogValue = ref(false)
const selectedMeasurement = ref(null)
const selectedLevel = ref(null)

const measurementAndLevels = likelihoodMeasurementAndLevels

const result = likelihoodResult

watchEffect(() => {
  dialogValue.value = props.active
})

watch(selectedMeasurement, () => {
  selectedLevel.value = ''
})

const measurement = computed(() => {
  return Object.keys(measurementAndLevels)
})

const levels = computed(() => {
  return measurementAndLevels[selectedMeasurement.value] ?? []
})

const selectedResult = computed(() => {
  const selectedLevelArray = measurementAndLevels[selectedMeasurement.value] ?? []
  const index = selectedLevelArray.findIndex(value => {
    return value === selectedLevel.value
  })
  return result[index] ?? {}
})

const isSubmitDisabled = computed(() => {
  return !selectedMeasurement.value || !selectedLevel.value
})

const close = function () {
  emits('update:active', false)
}

const submit = function () {
  emits('submit', selectedResult.value.level)
  close()
}

</script>

<style lang="scss" scoped>
.box-result {
  border-radius: 5px;
  border: 1px solid #939393;
  height: 68px;
  background: rgb(var(--v-theme-surface));
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  padding: 6px 0 6px 14px;

  &>div:first-child {
    font-size: 1rem;
  }

  &>div:last-child {
    font-size: 0.7rem;
    line-height: 0.7rem;
  }

  &::before {
    content: "Result";
    position: absolute;
    top: -0.6rem;
    left: 10px;
    font-size: 0.7rem;
    background-color: rgb(var(--v-theme-surface));
  }
}
</style>
