<template>
  <VCard>
    <VCardTitle>
      <div class="title">
        {{ title }}
        <div class="text-subtitle-2">{{ subtitle }}</div>
      </div>
    </VCardTitle>
    <VList density="compact">
      <VListItem v-for="(listItem, idx) in list" :key="idx">
        <VListItemTitle>
          <div v-html="listItem.title" />
        </VListItemTitle>
        <VListItemSubtitle>
          <div v-html="listItem.subtitle" />
        </VListItemSubtitle>
      </VListItem>
    </VList>
  </VCard>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => ([])
  }
})
</script>

<style lang="scss" scoped>
.title {
  padding: 16px 0 0 6px;
}

:deep(.v-list) {
  height: 270px;
}

:deep(.v-list-item:not(:first-child)) {
  border-top: 1px solid rgb(var(--v-theme-grey-200));
}
</style>
