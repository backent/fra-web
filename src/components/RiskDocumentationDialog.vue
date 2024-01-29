<template>
  <VDialog v-model="dialogValue" width="1000" persistent>
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="close()" />

    <!-- Dialog Content -->
    <VCard title="Risk Acceptance Criteria Documentation">
      <VCardText>
        <img :src="doc1" alt="doc1">
        <img :src="doc2" alt="doc2">
        <img :src="doc3" alt="doc3">
        <img :src="doc4" alt="doc4">
        <img :src="doc5" alt="doc5">
      </VCardText>
    </VCard>
  </VDialog>
</template>


<script setup>

import doc1 from '@/assets/images/risk-documentations/doc1.jpg';
import doc2 from '@/assets/images/risk-documentations/doc2.jpg';
import doc3 from '@/assets/images/risk-documentations/doc3.jpg';
import doc4 from '@/assets/images/risk-documentations/doc4.jpg';
import doc5 from '@/assets/images/risk-documentations/doc5.jpg';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:active', 'submit'])

const dialogValue = ref(false)

watchEffect(() => {
  dialogValue.value = props.active
})


const close = function () {
  emits('update:active', false)
}


</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>
