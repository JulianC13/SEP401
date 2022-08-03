let firebase =require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyAJARgDKBZxQPTp5-f7aW1fOFXYwQ1CvfQ",
    authDomain: "sep401-c7014.firebaseapp.com",
    databaseURL: "https://sep401-c7014-default-rtdb.firebaseio.com",
    projectId: "sep401-c7014",
    storageBucket: "sep401-c7014.appspot.com",
    messagingSenderId: "499375396148",
    appId: "1:499375396148:web:e497e23ffa5c081debc161",
    measurementId: "G-PNL8X0G7Q6"
  };
  firebase.initializeApp(firebaseConfig);
  var dbref= firebase.database().ref();
  var listDes = []
  
  module.exports = {dbref,firebase};

  