# Cat Liker

> This was created in one day as a showcase of Firebase and Google Translate API

![Demo Picture](https://github.com/tchin25/cat-liker/blob/master/static/screencap.PNG)

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
## Known Bugs 
> These are completely fixable but this is just a showcase so I'm not spending more time on it
- Uploading a cat with an already taken name overrides the old cat picture
- Definitely not mobile responsive at all
