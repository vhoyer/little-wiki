import { firestore } from '~/plugins/firebase'

export const state = () => ({
})

export const mutations = {
  pushNode(state, value) {
    Object.assign(state, value)
  },
}

export const actions = {
  async getNode({commit, state, dispatch}, path) {
    if (state.hasOwnProperty(path)) {
      return state[path]
    }
    //getFromFirebase
    const doc = await firestore.collection('tree-view').doc(path).get()
    commit('pushNode', {
      [doc.id]: {
        folders: [],
        articles: {},
        ...doc.data(),
      },
    })

    return state[path]
  }
}
