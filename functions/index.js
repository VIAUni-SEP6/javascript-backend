const admin = require('./firebase-service.js');
const createUser = require('./services/createUser');
const validateFirebaseIdToken = require('./middlewares/getIdToken');
const toplistModule = require('./services/toplist');
const addFavouriteMovie = toplistModule.addFavouriteMovie;
const getFavouriteMovies = toplistModule.getFavouriteMovies;
const deleteFavouriteMovie = toplistModule.deleteFavouriteMovie;
const functions = require('firebase-functions');


const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin:true}));
app.use(validateFirebaseIdToken);

app.post('/signup', createUser);

app.get('/addFavouriteMovie/:id', addFavouriteMovie);

app.get('/getFavouriteMovies', getFavouriteMovies);

app.get('/deleteFavouriteMovie/:id', deleteFavouriteMovie);

/*const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
})*/

exports.expressApi = functions.https.onRequest(app);