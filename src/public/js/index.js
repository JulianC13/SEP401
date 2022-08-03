// JavaScript Document

  $('#loginForm').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    let mailLog = data[0].value
    let passLog= data[1].value
    firebase.auth().signInWithEmailAndPassword(mailLog, passLog).then((userCredential) => {
      // Signed in
      obtenerInfoUserDb(userCredential.uid)
      consultarAppointments(userCredential.uid)
      swal.fire({
        icon: 'success',
        title: 'PERFECT',
        confirmButtonColor: '#00FF00',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/menu';
        }
      })
    })
    .catch((error) => {
      swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: error.message,
        confirmButtonColor: '#FF0000',
      })
    });
  });

  
  $('#signupForm').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    if(data[5].value != data[4].value ){
      swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Email not the same',
        confirmButtonColor: '#FF0000',
      })
     return
    }
    if(data[7].value != data[6].value){
      swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Password not the same',
        confirmButtonColor: '#FF0000',
      })
      return
    }
 
    let mail = data[4].value
    let passss= data[6].value
    firebase.auth().createUserWithEmailAndPassword(mail, passss).then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    createUserDB(data[0].value, data[1].value, data[2].value,data[3].value,data[4].value, userCredential.uid);
    location.href = '/menu';
   
  })
  .catch((error) => {
    var errorCode = error.code;
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: error.message,
      confirmButtonColor: '#FF0000',
    })
    var errorMessage = error.message;
    // ..
  });
    
  });

  var createUserDB = function (name, phone, address, docid, email, idU){
    firebase.database().ref('Client/' + idU).set({
        username: email,
        name: name,
        phone: phone,
        address: address,
        docid: docid
      });
    
  }

  var resetPassword= function(){
    swal.fire({
      input: 'text',
      title: 'Password Recovery',
      confirmButtonColor: '#00FF00',
      confirmButtonText: 'Send mail',
      focusConfirm: false,
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage(`Please enter email`)
        }
        return { email: email}
      }
    }).then((result) => {
     firebase.auth().sendPasswordResetEmail(result.value.email)
      .then(function() {  
      // Email sent.
      console.log("Envio bien")
      })
      .catch(function(error) {
      // An error happened.
       console.log("ERRRROR RECOVERY")
       console.log("not correct format or user dont exist")
      });
    })
    
  }

 
  