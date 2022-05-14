const admin = require('../firebase-service.js');

const createUser = async (req, res) => {
    const {
          displayName,
          email,
          password
        } = req.body;
    
        const user = await admin.auth().createUser({
          displayName,
          email,
          password
        }).then(function(user) {
            console.log("Successfully created new user:", user.uid)
            return res.send(user)
        })
        .catch(function(err) {
            console.log("Error creating new user:", err)
            return res.send(err)
        })
    }

    module.exports = createUser;