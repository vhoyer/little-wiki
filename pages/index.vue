<template>
  <div>
    <tree-explorer :path="'=+'" />
  </div>
</template>

<script>
import TreeExplorer from '~/components/tree-explorer/folder.vue'

export default {
  components: {
    TreeExplorer,
  },
}
</script>
