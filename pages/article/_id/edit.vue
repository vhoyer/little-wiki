<template>
  <div class="edit">
    <nuxt-link
      :to="`/article/${doc.id}`"
      class="button button--grey"
    >
      back
    </nuxt-link>

    <a
      role="button"
      class="button button--green"
      @click="save"
    >
      save
    </a>

    <a
      role="button"
      class="button button--red"
      @click="deleteArticle"
    >
      delete
    </a>
    <hr>

    <article>
      <small>{{ path }}</small>

      <h2 editable-content="true">{{ title }}</h2>

      <textarea
        v-model="body"
        class="text-edit"
      />

      <a
        role="button"
        class="button button--green button--left"
        @click="save"
      >
        save
      </a>
    </article>
  </div>
</template>

<style scoped>
.edit {
  margin-bottom: 1em;
}

.text-edit {
  height: 80vh;
  max-width: 100%;
  min-width: 100%;
}

.button--left {
  margin-left: auto;
}
</style>


<script>
import firebase from '~/plugins/firebase'

const firestore = firebase.firestore()

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
      path: snap.path.split('=+').join('/'),
      title: snap.title,
      body: snap.body,
    }
  },
  methods: {
    save() {
      firestore.collection("articles").doc(this.doc.id).update({
        title: this.title,
        body: this.body,
      }).then(() => {
        this.$router.push({
          path: `/article/${this.doc.id}`,
        })
      }).catch((err) => {
        alert(err)
      })
    },
    deleteArticle() {
      let batch = firestore.batch()

      batch.delete(firestore.collection("articles").doc(this.doc.id))
      batch.update(firestore.collection("tree-view").doc(this.path), {
        [`articles.${this.doc.id}`]: firebase.firestore.FieldValue.delete(),
      })

      batch.commit().then(() => {
        this.$router.push({
          path: '/',
        })
      }).catch((err) => {
        alert(err)
      })
    }
  },
}
</script>

