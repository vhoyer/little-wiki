<template>
  <section class="container">
    <div>
      <h1 class="title">
        little-wiki
      </h1>
      <h2 class="subtitle">
        A small wiki for you to host with firebase
      </h2>
      <tree-explorer :path="'=+'" />
    </div>
  </section>
</template>

<script>
import TreeExplorer from '~/components/tree-explorer/folder.vue'

export default {
  components: {
    TreeExplorer,
  },
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
