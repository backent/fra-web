<template>
  <VListItem link @click="handleSearchItemClick(item)">
    <VListSubheader>
      <VListItemTitle>
        <div class="text-disabled text-capitalize">
          Product Name
        </div>
        <div v-if="!item.highlight.find(item => item.field === 'Product Name')">{{ item.product_name }}</div>
        <div v-else v-html="item.highlight.find(item => item.field === 'Product Name').value"></div>
      </VListItemTitle>
    </VListSubheader>
    <VListItem v-for="item in  item.highlight.filter(item => item.field !== 'Product Name') " :key="item.field">
      <VListSubheader>
        <div class="text-disabled text-capitalize">
          {{ item.field }}
        </div>
        <div style="text-transform: initial;" v-html="item.value"></div>
      </VListSubheader>
    </VListItem>
  </VListItem>
</template>


<script setup>


defineProps({
  item: {
    type: Object,
    default: () => ({
      field: '',
      product_name: '',
      highlight: [],
      value: ''
    })
  }
})

const emits = defineEmits('onListItemClick')

const handleSearchItemClick = item => {
  emits('onListItemClick', item)
}

</script>
