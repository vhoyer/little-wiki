<template>
  <section class="container">
    <div>
      <h1 class="title">
        little-wiki
      </h1>
      <h2 class="subtitle">
        A small wiki for you to host with firebase
      </h2>
      <hr>
      <nuxt/>
    </div>
  </section>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button {
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--green {
  border: 1px solid #3b8070;
  color: #3b8070;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  border: 1px solid #35495e;
  color: #35495e;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.button--red {
  border: 1px solid #ac2020;
  color: #ac2020;
}

.button--red:hover {
  color: #fff;
  background-color: #ac2020;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

pre {
  overflow: scroll;
}
</style>
