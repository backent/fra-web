<script setup>
defineProps({
  img: {
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  subtitle1: {
    type: String,
    default: ''
  },
  subtitle2: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-center  align-start pb-0 px-3 pt-3 mb-4 bg-light-primary rounded">
        <VImg
          :src="img"
          width="100%"
          height="auto"
        />
      </div>
      <div>
        <h4 class="text-h4 mb-1">
          {{ title }}
        </h4>
        <div class="text-body-2 mb-2">{{ subtitle1 }}</div>
        <div class="text-body-2">{{ subtitle2 }}</div>
        <VBtn block class="mt-4">
          Continue
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>
