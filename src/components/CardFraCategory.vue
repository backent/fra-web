<template>
  <VCard>
    <VCardText>
      <div class="card-title">
        <VAvatar rounded size="34" :color="colorTheme" variant="tonal" />
        <span>
          {{ title }}
        </span>
      </div>
      <div class="card-description">
        {{ description }}
      </div>
    </VCardText>
    <div class="card-action">
      <RouterLink :to="`/fra-document/${title.toLowerCase()}-list`">
        Document list
        <VIcon icon="tabler-chevron-right" />
      </RouterLink>
    </div>
  </VCard>
</template>

<script setup>

defineProps({
  title: {
    type: String
  },
  description: {
    type: String,
    default: ''
  },
  colorTheme: {
    type: String,
    default: ''
  }
})
</script>


<style lang="scss" scoped>
.card {
  &-title {
    font-size: 1.2rem;
    display: flex;
    gap: 10px;

    margin-bottom: 12px;
  }

  &-description {
    color: #6F6B7D;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    margin-bottom: 16px;
    overflow: auto;
  }

  &-action {
    color: rgb(var(--v-theme-primary));
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 22px;
  }
}
</style>
