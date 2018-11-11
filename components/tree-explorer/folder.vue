<template>
  <details>
    <summary
      class="folder"
      @click="openFolder"
    >
      {{ folderName }}
      <button
        class="addNode"
        @click="addNode"
      >
        + add node
      </button>
    </summary>

    <folder-content
      :articles="articles"
      :folders="folders"
    />
  </details>
</template>

<style scoped>
.folder {
  line-height: 3em;
    line-height: 3em;
    display: flex;
    align-items: center;
}

.addNode {
  display: none;
  margin-left: auto;
  margin-right: 1em;
  border-radius: 4px;
  padding: 10px 30px;
  border: 1px solid #35495e;
  background-color: #fff;
}

.addNode:hover {
  color: #fff;
  background-color: #35495e;
}

details[open] > summary > .addNode {
  display: block;
}
</style>


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

      if (!input) {
        return
      }

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

