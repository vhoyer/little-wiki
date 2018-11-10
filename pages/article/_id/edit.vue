<template>
  <article>
    <small>{{ path }}</small>

    <h2 editable-content="true">{{ title }}</h2>

    <textarea
      v-model="body"
    />

    <button @click="save">save</button>
  </article>
</template>

<script>
import { firestore } from '~/plugins/firebase'

export default {
  async asyncData({ params, error }) {
    const doc = await firestore.collection("articles").doc(params.id).get()

    if (!doc.exists) {
      error({ statusCode: 404, message: 'Article not found' })
      return
    }

    const snap = doc.data()
    return {
      doc,
      path: snap.path,
      title: snap.title,
      body: snap.body,
    }
  },
  methods: {
    save() {
      firestore.collection("articles").doc(this.doc.id).update({
        title: this.title,
        body: this.body,
      })
      this.$router.push({
        path: `/article/${this.doc.id}`,
      })
    }
  },
}
</script>

