require("dotenv").config();

const { initializeApp, applicationDefault } = require("firebase-admin/app");
//applicacionDefault va a leer el GOOGLE_APPLICATION_CREDENTIALS

const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
module.exports = {
  db,
};
