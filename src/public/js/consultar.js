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
  var dbrefcake= firebase.database().ref().child('items/desserts/cake');
  var dbrefice= firebase.database().ref().child('items/desserts/icecream');
  var cak = []
  var ice = []

  dbrefcake.on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    cak.push(snapshot.val())
  
  }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
  });
    

  dbrefice.on("child_added", function(snapshot) {
    // var key = Object.keys(snapshot.val());
    var key = snapshot.key;
    var valor = snapshot.val();

    ice.push({key,valor})
    // console.log(ice)  
  }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
  });

  var consultarcake= function(){
    return cak;
  }
  var consultarice= function(){
    return ice;
  }