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
  margin-left: auto;
  margin-right: auto;
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
