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
import { mapActions, mapState } from 'vuex'
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
  watch: {
    $store(state) {
      this.articles = state[this.path].articles
      this.folders = state[this.path].folders
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
      const promptText = "New file: (To create a folder append a '/' to the end)"
      let input = prompt(promptText)
      let folder = this.path

      while (input.includes('=+')) {
        alert("Feeling smarty-pants, ye?\nYou cannot use '=+' because of reasons. Try again.")

        input = prompt(promptText, input)
      }

      if (input.includes('/')) {
        let path = input.split('/')
        input = path.pop()

        if (!path[0]) {
          //if path begins with `/`, ignore relative pathing
          folder = ''
          path.shift()
        }
        folder += '=+' + path.reduce((acc,cur) => `${acc}=+${cur}`)
      }

      this.addFolderAndArticle({path: folder, name: input});
    }
  },
}
</script>

