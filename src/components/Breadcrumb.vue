<template>
  <div class="d-flex breadcrumbs text-h4">
    <RouterLink class="d-flex breadcrumb" :to="path.path" v-for="(path, idx) in generatedBreadcrumb">
      <div class="text-capitalize" :class="{ 'text-secondary': idx !== generatedBreadcrumb.length - 1 }"> {{ path.name }}
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const generatedBreadcrumb = computed(() => {
  const reducedRoute = route.matched.reduce((pre, curr) => {
    if (pre[curr.path]) {
      return pre
    }
    const splitted = curr.path.split('/')
    return {
      ...pre,
      [curr.path]: {
        name: splitted[splitted.length - 1].replaceAll('-', ' '),
        path: curr.path
      }
    }
  }, {})

  return Object.values(reducedRoute)
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  .breadcrumb:not(:first-child)::before {
    content: "/";
    display: inline;
    margin: 0 2px;
    color: rgb(var(--v-theme-secondary));
  }

  .breadcrumb:last-child {
    color: #5D596C;
    cursor: default;
  }
}
</style>
