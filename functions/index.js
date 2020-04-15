const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.translateText = functions.https.onCall(async (data, context) => {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate").v2;

  // Creates a client
  const translate = new Translate();

  let [translations] = await translate.translate(data, "en");
  translations = Array.isArray(translations) ? translations : [translations];
  // console.log('Translations:');
  // translations.forEach((translation, i) => {
  //   console.log(`${text[i]} => (${target}) ${translation}`);
  // });

  return translations;
});

exports.aggregateComments = functions.firestore
  .document("cats/{catId}/comments/{commentId}")
  .onWrite((change, context) => {
    const catId = context.params.catId;
    const commentId = context.params.commentId;

    // ref to the parent document
    const docRef = admin
      .firestore()
      .collection("cats")
      .doc(catId);

    // get all comments and aggregate
    return docRef
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get()
      .then(querySnapshot => {
        // get the total comment count
        const commentCount = querySnapshot.size;

        const recentComments = [];

        // add data from the 5 most recent comments to the array
        querySnapshot.forEach(doc => {
          recentComments.push(doc.data());
        });

        recentComments.splice(5);

        // record last comment timestamp
        const lastActivity = recentComments[0].createdAt;

        // data to update on the document
        const data = { commentCount, recentComments, lastActivity };

        // run update
        return docRef.update(data);
      })
      .catch(err => console.log(err));
  });

exports.likedComment = functions.firestore
  .document("hearts/{heartId}")
  .onCreate((change, context) => {
    const heartId = context.params.heartId;

    let ids = heartId.split("_");

    // ref to the parent document
    const docRef = admin
      .firestore()
      .collection("cats")
      .doc(ids[1]);

    // get likes and aggregate
    return docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          let likes = doc.data().likes + 1;
          // data to update on the document
          const data = { likes };

          // run update
          return docRef.update(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(err => console.log(err));
  });
