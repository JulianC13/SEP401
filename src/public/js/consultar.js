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
  var dbrefAppointment= firebase.database().ref().child('Appointment');
  var dbrefClient= firebase.database().ref().child('Client');
  var dbref= firebase.database().ref();
  var dbrefSpecialist= firebase.database().ref().child('Specialist');
  
  var appointments =[]
  let usuarioEnSesionId = null
     
  // dbrefice.on("child_added", function(snapshot) {
  //   // var key = Object.keys(snapshot.val());
  //   var key = snapshot.key;
  //   var valor = snapshot.val();
  //   ice.push({key,valor})
  //   // console.log(ice)  
  // }, function (errorObject) {
  //  console.log("The read failed: " + errorObject.code);
  // });
  var obtenerInfoUserDb =  function(idUser){
    dbref.child('Client/'+idUser).on('value', (snapshot) => {
      const data = snapshot.val();
      sessionStorage.setItem("userSession",JSON.stringify(data))
    });
  }

  function obtenerInfoAppointmentDb (idAppoint){
    console.log("PATH")
    console.log(idAppoint)
    return new Promise(resolve => {
      dbref.child('Appointment/'+idAppoint).on('value', (snapshot) => {
        const data = snapshot.val();
        resolve(data)
      });
      
    });
    
  }

  var consultarAppointments= function(uid){
    appointments =[]
    dbrefAppointment.on("value", function(snapshot) {
      snapshot.forEach(function(appointment) {
        var key = appointment.key;
        var valor = appointment.val();
        console.log(valor)
        if(valor.client == uid){
          var actAppointment = new Appointment(key,valor.date,valor.status,valor.client,valor.specialist);
          appointments.push(actAppointment)
        }
        });
        console.log(appointments)
        sessionStorage.setItem("appointments",JSON.stringify(appointments))
       
  
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
    
    return appointments;
  }
  var consultarice= function(){
    return ice;
  }

  getAppointments=function(){
    return appointments
  }

  var logout = function (){
    firebase.auth().signOut();
    sessionStorage.removeItem("appointments")
    sessionStorage.removeItem("userSession")
    location.href = '/';
   
  }
