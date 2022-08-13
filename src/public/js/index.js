// JavaScript Document

// Method that handle the submit event of the login form
$('#loginForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  let mailLog = data[0].value
  let passLog= data[1].value
  firebase.auth().signInWithEmailAndPassword(mailLog, passLog).then((userCredential) => {
    // Signed in
    getInfoUserDb(userCredential.uid)
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

// Method that handle the submit event of the sign up form
$('#signupForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  var phoneNum = /^0[45]\d{8}$/;
  if(!data[1].value.match(phoneNum)){
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Phone number must be 10 digits and start with 04',
      confirmButtonColor: '#FF0000',
    })
    return      
  }
  var nameReq = /^(?=.{4,})[a-zA-Z\s\-,]+.\*?$/;
  if(!data[0].value.match(nameReq)){
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Name must contain only letters and have a minimum lenght of 4 characters',
      confirmButtonColor: '#FF0000',
    })
    return
  }
  var addresReq = /^(?:[0-9 ]+[a-z ]|[a-z ]+[0-9 ])[a-z0-9 ]*$/i;
  if(!data[3].value.match(addresReq)){
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Please provide only alphanumeric characters in the address field',
      confirmButtonColor: '#FF0000',
    })
    return
  }
  var emailReq = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!data[4].value.match(emailReq)){
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Please provide a valid email address',
      confirmButtonColor: '#FF0000',
  })
  return
  }
  var passLenght = /^.{8,}$/;
  if(!data[5].value.match(passLenght)){
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Your password must be at least 8 (any) characters and symbols',
      confirmButtonColor: '#FF0000',
  })
  return
  }
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
    getInfoUserDb(userCredential.uid)
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

// Method that allows to reset the password of any user 
var resetPassword= function(){
  swal.fire({
    input: 'text',
    title: 'Password Recovery',
    confirmButtonColor: '#00FF00',
    inputPlaceholder: 'Enter your  email',
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
      swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Please check your email and recover your password",
    })
     console.log("Success")
    })
    .catch(function(error) {
    // An error happened.
    swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: error.message,
      confirmButtonColor: '#FF0000',
    })
     console.log("ERRROR RECOVERY")
     console.log("not correct format or user dont exist")
    });
  })
  
}




