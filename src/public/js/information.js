//To show Personal Information in Account tab
obtenerInfoUserDb(sessionStorage.getItem("uId"))
userr = JSON.parse(sessionStorage.getItem("userSession"));
const myElement = document.getElementById("userDetails");
myElement.innerHTML =  userr

$("input[name='fullName']").val(userr.name);
$("input[name='phone']").val(userr.phone);
$("input[name='docId']").val(userr.docid);
$("input[name='address']").val(userr.address);
$("input[name='emailAdd']").val(userr.username);

//For the active tab to stay on reload
$(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      localStorage.setItem('lastTab', $(this).attr('href'));
    });
    var lastTab = localStorage.getItem('lastTab');
    if (lastTab) {
      $('[href="' + lastTab + '"]').tab('show');
    }
  });

//Validating new details in Account tab
$('#updateAccountForm').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();

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

    //Updating new details in Account tab to Database
    updateUserDB(data[0].value,data[1].value,data[2].value,data[3].value)

   
    swal.fire({
        icon: 'success',
        title: 'PERFECT',
        confirmButtonColor: '#00FF00',
    }).then(val =>( location.reload()))
   

});

function updateUserDB(name, phone, docid, address) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      this.userId=user.uid
      let idU=user.uid

      firebase.database().ref('Client/' + idU).update({
          name: name,
          phone: phone,
          docid: docid,
          address: address,
      });         
    } 
  });
}

//Validating new details in Password tab
$('#updatePasswordForm').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();

    var passLenght = /^.{8,}$/;
    if(!data[1].value.match(passLenght)){
        swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Your new password must be at least 8 (any) characters and symbols',
            confirmButtonColor: '#FF0000',
    })
    return
    }
    if(data[1].value != data[2].value){
        swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'The password and Password Confirmation are not the same.',
            confirmButtonColor: '#FF0000',
    })
    return
    }

    let oldPass = data[0].value
    let newPasswordUpdate = data[1].value
    let userEmail = userr.username

    //Updating new details in Account tab to Database
    updatePassword(oldPass,newPasswordUpdate,userEmail)

    function updatePassword(oldPass, newPasswordUpdate,userEmail) {

        firebase.auth().signInWithEmailAndPassword(userEmail, oldPass).then((userCredential) => {
            
        var user = firebase.auth().currentUser;
        var newPassword = newPasswordUpdate

        user.updatePassword(newPassword).then(function() {
            swal.fire({
                icon: 'success',
                title: 'PERFECT',
                confirmButtonColor: '#00FF00',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/information';
                }
              })
            }).catch(function(error) {
            console.log("error updating DB but correct pass")
            });
          }).catch((error) => {
            swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: "The old password you have entered is incorrect.",
              confirmButtonColor: '#FF0000',
            })
          });
    }
});

$('#cancelInfoUpdate').click(function() {
    location.reload();
});

$('#cancelPassUpdate').click(function() {
    location.reload();
});

// Method that check that there is a user sesion active
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log("usuariooooo js loggeadoooo")
  } else {
    // No user is signed in.
    logout();
  }
});