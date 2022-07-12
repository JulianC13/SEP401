// // JavaScript Document

$(document).ready(function(){
  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("usuariooooo loggeadoooo")
    } else {
      // No user is signed in.
      console.log("SIIIIINNNN usuariooooo loggeadoooo")

    }
  });
  
})
