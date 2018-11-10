export const state = () => ({
  "=+": {
    articles: [
      "daTeaaGaskdArlsdsKgo",
    ],
    folders: [
      "=+first-folder",
    ],
  },
  "=+first-folder": {
    articles: [
      "rFKcfaW0TmxxWmr4dfcb",
    ],
    folders: [],
  },
})

export const mutations = {
  pushNode(state, value) {
    state = {
      ...state,
      ...value,
    }
  },
}

export const actions = {
  async getNode({commit, state}, path) {
    if (state.hasOwnProperty(path)) {
      return state[path]
    } else {
      //getFromFirebase
      return await null
    }
  }
}
