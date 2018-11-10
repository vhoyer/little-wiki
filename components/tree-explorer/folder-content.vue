<template>
  <ul class="folder-content">
    <li
      v-for="(folderPath, index) in folders"
      :key="index"
      class="folder-content__folders"
    >
      <folder
        :path="folderPath"
      />
    </li>
    <li
      v-for="(article, index) in articles"
      :key="index+folders.lenght"
    >
      {{ article }}
    </li>
  </ul>
</template>

<style>
.folder-content__folders {
  list-style: none;
  margin-left: -18px;
}
</style>


<script>
export default {
  components: {
    //async import
    Folder: () => import('~/components/tree-explorer/folder.vue'),
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
    folders: {
      type: Array,
      required: true,
    },
  },
}
</script>

