const admin = require("firebase-admin");

const credentials = require("./config/serviceAccountKey.json");

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});

module.exports = admin;