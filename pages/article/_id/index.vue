<template>
  <article>
    <small>{{ path }}</small>
    <h2>{{ title }}</h2>

    <div>
      {{ body }}
    </div>
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
      path: snap.path,
      title: snap.title,
      body: snap.body,
    }
  },
}
</script>

