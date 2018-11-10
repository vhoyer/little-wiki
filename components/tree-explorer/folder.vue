<template>
  <details>
    <summary
      @click="openFolder"
    >
      {{ folderName }}
    </summary>
    <button>+ add node</button>

    <folder-content
      :articles="articles"
      :folders="folders"
    />
  </details>
</template>

<script>
import { mapActions } from 'vuex'
import FolderContent from '~/components/tree-explorer/folder-content.vue'

export default {
  components: {
    FolderContent,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articles: {},
      folders: [],
    }
  },
  computed: {
    folderName() {
      const folderName = this.path.split('=+').reverse()[0]

      if (folderName === '') {
        return 'root:/'
      } else {
        return folderName
      }
    },
  },
  methods: {
    ...mapActions('tree-view', {
      getNode: 'getNode',
    }),
    openFolder() {
      this.getNode(this.path)
      .then(({ articles, folders }) => {
        this.articles = articles
        this.folders = folders
      })
    },
  },
}
</script>

