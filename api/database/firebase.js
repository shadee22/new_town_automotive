// const fs = require('firebase-admin');
// const {getAuth} = require("firebase/auth");

const admin = require('firebase-admin');
const serviceAccount = require('./auto-8b640-firebase-adminsdk-fy8hn-ebb4458081.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// time: admin.firestore.Timestamp.now()

const db = admin.firestore();

const create = async (req, res) => {
  db.collection('users').doc(req.body.user.name).set({ user_details: req.body.user, grocery_list: req.body.grocery_list  });
  res.json(req.body.data);
}

const save_feedback = async (data) => {
  var data = data
  console.log(data);
  // await db.collection('feedbacks').doc(data.split(" ")[0]).set({ feedback: data });
  return 'saved'
}
const database = ()=>{
  return 'dhellb'
}

// const check = (req, res) => {
//   console.log(user_db);
//   res.json(user_db);
// }



module.exports = {
  // check,
  db,
  database,
  create,
  save_feedback
}

