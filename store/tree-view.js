import { firestore } from '~/plugins/firebase'
const treeView = firestore.collection('tree-view')

export const state = () => ({
  tree: {},
})

export const mutations = {
  pushNode(state, value) {
    state.tree = {
      ...state.tree,
      ...value
    }
  },
}

export const actions = {
  async getNode({commit, state}, path) {
    if (state.tree.hasOwnProperty(path)) {
      return
    }
    //getFromFirebase and set subscriber
    treeView.doc(path).onSnapshot(doc => {
      commit('pushNode', {
        [doc.id]: {
          folders: [],
          articles: {},
          ...doc.data(),
        },
      })
    })
  },
  //Sorry sometimes I can't help but to write shitty code, I find it funny
  async addFolderAndArticle({commit}, {path, name}) {
    const articleId = name ? firestore.collection('articles').add({body: '', path: path, title: name}).then(docRef => docRef.id) : null

    let tail = ''
    const structure = path.split('=+').filter(n => n).map((val) => {
      return {
        parent: tail ? tail : "=+",
        folder: tail += '=+' + val,
      }
    }).concat({parent: path})

    const tryAddFolder = async ({parent, folder}) => {
      const doc = await treeView.doc(parent).get()

      const node = { folders: [], articles: {}, ...(doc.exists ? doc.data() : {}) }
      if (folder) {
        node.folders.push(folder)
        node.folders = Array.from(new Set(node.folders))
      }
      if (path === parent && name) {
        node.articles[await articleId] = name
      }

      commit('pushNode', { [parent]: node })
      return treeView.doc(parent).set(node)
    }
    const promises = structure.map((element) => tryAddFolder(element))

    return Promise.all(promises)
  },
}
