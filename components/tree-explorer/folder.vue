<template>
  <details
    :open="opened"
  >
    <summary
      class="folder"
      @click="opened = !opened"
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
      :is-opened="opened"
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
import { mapActions, mapState, mapMutations } from 'vuex'
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
      opened: false,
    }
  },
  computed: {
    ...mapState('tree-view', {
      tree: 'tree',
      treeState: 'treeState',
    }),
    articles() {
      if (!this.tree[this.path]) return {}

      return this.tree[this.path].articles
    },
    folders() {
      if (!this.tree[this.path]) return []

      return this.tree[this.path].folders
    },
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
    opened() {
      this.toggleFolder()
    },
  },
  mounted() {
    this.getNode(this.path)
    this.opened = this.treeState.includes(this.path)
  },
  methods: {
    ...mapActions('tree-view', {
      addFolderAndArticle: 'addFolderAndArticle',
      getNode: 'getNode',
    }),
    ...mapMutations('tree-view', {
      toggleNodeState: 'toggleNodeState',
    }),
    toggleFolder() {
      const { path, opened: setOpen } = this

      this.toggleNodeState({path, setOpen})
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

