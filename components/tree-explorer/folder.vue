<template>
  <details>
    <summary
      @click="openFolder"
    >
      {{ folderName }}
    </summary>
    <button @click="addNode">+ add node</button>

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
      addFolderAndArticle: 'addFolderAndArticle',
      getNode: 'getNode',
    }),
    openFolder() {
      this.getNode(this.path)
        .then(({ articles, folders }) => {
          this.articles = articles
          this.folders = folders
        })
    },
    addNode() {
      let input = prompt("New file: (To create a folder append a '/' to the end)")
      let folder = this.path

      while (input.includes('=+')) {
        alert("Feeling smarty-pants, ye?\nYou cannot use '=+' because of reasons. Try again.")

        input = prompt("New file: (To create a folder append a '/' to the end)", input)
      }

      if (input.includes('/')) {
        let path = input.split('/')
        input = path.pop()

        folder += path.reduce((acc,cur) => `${acc}=+${cur}`)
      }

      this.addFolderAndArticle({path: folder, name: input});
    }
  },
}
</script>

