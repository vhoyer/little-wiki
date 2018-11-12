# little-wiki

> A small wiki for you to host with firebase

## Build Setup

First of all you will need to create a file named `firebase.config.json` in the root of your project.
You can base it on the `firebase.config.json.exemple` bundled within this repo, but it's probably better
to log into your [firebase console](https://console.firebase.google.com) and get the content of it there.

You can find it in here:
![image demonstrating where to get firebase.config.json content](docs/exemple.png =3000x)


``` bash
# install dependencies
$ npm install
$ npm install --global firebase-tools

# initial set-up
$ firebase use --add # and choose your project

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
