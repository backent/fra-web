<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import {
  VList,
  VListItem,
} from 'vuetify/components/VList';

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  searchResults: {
    type: Array,
    required: true,
  },
  onLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:isDialogVisible',
  'search',
])


// 👉 Hotkey

// eslint-disable-next-line camelcase
const { ctrl_k, meta_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})

const refSearchList = ref()
const refSearchInput = ref()
const searchQueryLocal = ref('')

// 👉 watching control + / to open dialog

/* eslint-disable camelcase */
watch([
  ctrl_k,
  meta_k,
], () => {
  emit('update:isDialogVisible', true)
})

/* eslint-enable */

// 👉 clear search result and close the dialog
const clearSearchAndCloseDialog = () => {
  searchQueryLocal.value = ''
  emit('update:isDialogVisible', false)
}

const getFocusOnSearchList = e => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    refSearchList.value?.focus('next')
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    refSearchList.value?.focus('prev')
  }
}

const dialogModelValueUpdate = val => {
  searchQueryLocal.value = ''
  emit('update:isDialogVisible', val)
}

watch(() => props.isDialogVisible, () => {
  searchQueryLocal.value = ''
})
</script>

<template>
  <VDialog max-width="600" :model-value="props.isDialogVisible" :height="$vuetify.display.smAndUp ? '550' : '100%'"
    :fullscreen="$vuetify.display.width < 600" class="app-bar-search-dialog"
    @update:model-value="dialogModelValueUpdate" @keyup.esc="clearSearchAndCloseDialog">
    <VCard height="100%" width="100%" class="position-relative">
      <VCardText class="pt-2">
        <!-- 👉 Search Input -->
        <VTextField ref="refSearchInput" v-model="searchQueryLocal" autofocus density="comfortable" variant="plain"
          @keyup.esc="clearSearchAndCloseDialog" @keydown="getFocusOnSearchList"
          @update:model-value="$emit('search', searchQueryLocal)">
          <!-- 👉 Prepend Inner -->
          <template #prepend-inner>
            <div class="d-flex align-center text-high-emphasis me-1">
              <VIcon size="22" icon="tabler-search" style="opacity: 1;" />
            </div>
          </template>

          <!-- 👉 Append Inner -->

          <template #append-inner>
            <div class="d-flex align-start">
              <div class="text-base text-disabled cursor-pointer me-1" @click="clearSearchAndCloseDialog">
                [esc]
              </div>

              <IconBtn size="22" @click="clearSearchAndCloseDialog">
                <VIcon icon="tabler-x" size="20" />
              </IconBtn>
            </div>
          </template>
        </VTextField>
      </VCardText>

      <!-- 👉 Divider -->
      <VDivider />

      <!-- 👉 Perfect Scrollbar -->
      <PerfectScrollbar :options="{ wheelPropagation: false, suppressScrollX: true }" class="h-100">
        <!-- 👉 Search List -->
        <VList v-show="searchQueryLocal.length && !!props.searchResults.length && !props.onLoading" ref="refSearchList"
          density="compact" class="app-bar-search-list">
          <!-- 👉 list Item /List Sub header -->

          <template v-for="item in props.searchResults" :key="item">
            <slot name="searchResult" :item="item">
              <VListItem>
                {{ item }}
              </VListItem>
            </slot>
          </template>
        </VList>

        <div v-show="props.onLoading"
          style="height: 100%; display: flex; justify-content: center; align-items: center;">
          <VProgressCircular indeterminate />
        </div>

        <!-- 👉 Suggestions -->
        <div v-show="!!props.searchResults && !searchQueryLocal && $slots.suggestions" class="h-100">
          <slot name="suggestions" />
        </div>

        <!-- 👉 No Data found -->
        <div v-show="!props.searchResults.length && searchQueryLocal.length && !props.onLoading" class="h-100">
          <slot name="noData">
            <VCardText class="h-100">
              <div
                class="app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100">
                <VIcon size="75" icon="tabler-file-x" />
                <div class="d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3">
                  <span>No Result For </span>
                  <span>"{{ searchQueryLocal }}"</span>
                </div>

                <slot name="noDataSuggestion" />
              </div>
            </VCardText>
          </slot>
        </div>
      </PerfectScrollbar>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.app-bar-search-suggestions {
  .app-bar-search-suggestion {
    &:hover {
      color: rgb(var(--v-theme-primary));
    }
  }
}

.app-bar-search-dialog {
  .v-overlay__scrim {
    backdrop-filter: blur(4px);
  }

  .v-list-item-title {
    font-size: 0.875rem !important;
  }

  .v-input {
    .v-field {
      .v-field__field {
        input {
          padding-block-start: 1rem !important;
        }
      }
    }
  }

  .app-bar-search-list {

    .v-list-item,
    .v-list-subheader {
      font-size: 0.75rem;
      padding-inline: 1.5rem !important;
    }

    .v-list-item {
      .v-list-item__append {
        .enter-icon {
          visibility: hidden;
        }
      }

      &:hover,
      &:active,
      &:focus {
        .v-list-item__append {
          .enter-icon {
            visibility: visible;
          }
        }
      }
    }

    .v-list-subheader {
      line-height: 1;
      min-block-size: auto;
      padding-block: 0.6875rem 0.3125rem;
      text-transform: uppercase;
    }
  }
}
</style>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>
