# Cat Liker

> This was created in one day as a showcase of Firebase and Google Translate API

## Build Setup

```bash
# create Firebase project and initialize Google auth, hosting, functions, storage, and Firestore
# also create OAuth user for Google Translate API if you want to see that in action (just google a recent tutorial of the api setup)

# install dependencies
$ yarn install

# init Firebase with hosting from dist folder
# (assuming you have Firebase SDK already set up)
$ firebase init

# install cloud functions dependencies
$ cd functions
$ npm install

# copy and paste Firebase config into the config section in nuxt.config.js

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and deploy
$ yarn build && firebase deploy
```