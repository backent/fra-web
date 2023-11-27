<template>
  <div class="text-h4 mb-2">{{ primaryText }} <span class="text-secondary">{{ secondaryText }}</span></div>
</template>

<script setup>
defineProps({
  primaryText: {
    type: String,
    default: ''
  },
  secondaryText: {
    type: String,
    default: ''
  }
})
</script>
