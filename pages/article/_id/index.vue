<template>
  <div>
    <nuxt-link
      :to="'/'"
      class="button button--grey"
    >
      back
    </nuxt-link>
    <nuxt-link
      :to="`/article/${doc.id}/edit`"
      class="button button--grey"
    >
      edit
    </nuxt-link>
    <hr>

    <article>
      <small>{{ path }}</small>

      <h2>{{ title }}</h2>

      <section v-html="marked"/>
    </article>
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
import marked from 'marked'

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
  computed: {
    marked() {
      const { lexer, parser } = marked

      return parser(lexer(this.body))
    }
  },
  created() {
    marked.setOptions({
      sanitize: true,
    })
  },
}
</script>

