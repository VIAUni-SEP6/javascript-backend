const admin = require('../firebase-service.js');
const db = admin.firestore();

const addFavouriteMovie = async (req, res) => {
    try{
        const uid = req.user.uid;
        let newMovie = await db.collection('userToplist').doc(uid);
        await newMovie.update({
        movieID: admin.firestore.FieldValue.arrayUnion(req.params.id)
        });
  
          return res.status(200).send({status: 'Success', msg: 'Data Saved'});
      }catch(error){
          console.log(error);
          return res.status(500).send({status: 'Failed', msg: error});
      }
    }

    
const getFavouriteMovies = async (req, res) => {
    try{
        const uid = req.user.uid;
        const reqDoc = db.collection('userToplist').doc(uid);
        let topList = await reqDoc.get();
        let response = topList.data();

        return res.status(200).send({status: 'Sucess', data:response});
    }catch(error){
        console.log(error);
        return res.status(500).send({status: 'Failed', msg: error});
    }
    }

    const deleteFavouriteMovie = async (req, res) => {
        try {
            const uid = req.user.uid;
            let removeMovie = await db.collection('userToplist').doc(uid);
            await removeMovie.update({
            movieID: admin.firestore.FieldValue.arrayRemove(req.params.id)
            });

            return res.status(200).send({ status: "Success", msg: "Data Removed" });
          } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
          }
        }

    module.exports = {addFavouriteMovie, getFavouriteMovies, deleteFavouriteMovie};