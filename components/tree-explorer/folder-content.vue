<template>
  <ul
    v-if="isOpened"
    class="folder-content"
  >
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
      v-for="(article, key) in articles"
      :key="key"
      class="article"
    >
      <nuxt-link
        :to="`/article/${key}`"
      >
        {{ article }}
      </nuxt-link>
    </li>
  </ul>
</template>

<style scoped>
.folder-content__folders {
  list-style: none;
  margin-left: -18px;
}

.article {
  padding: 1em;
}
</style>

<script>
export default {
  components: {
    //only import the component when it actually needs it
    Folder: () => import('~/components/tree-explorer/folder.vue'),
  },
  props: {
    articles: {
      type: Object,
      required: true,
    },
    folders: {
      type: Array,
      required: true,
    },
    isOpened: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    open(key) {
      console.log(key)
    },
  },
}
</script>

