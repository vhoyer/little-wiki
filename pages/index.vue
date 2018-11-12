<template>
  <div>
    <tree-explorer
      :path="'=+'"
      class="tree-view"
    />
  </div>
</template>

<style scoped>
.tree-view {
  max-width: 980px;
}
</style>


<script>
import TreeExplorer from '~/components/tree-explorer/folder.vue'

export default {
  components: {
    TreeExplorer,
  },
}
</script>
