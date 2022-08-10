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
  var dbrefAppointmentTest= firebase.database().ref('/Appointment');
  var dbrefClient= firebase.database().ref().child('Client');
  var dbref= firebase.database().ref();
  var dbrefSpecialist= firebase.database().ref().child('Specialist');
  
  var appointments =[]
  let usuarioEnSesionId = null
     
  var obtenerInfoUserDb =  function(idUser){
    dbref.child('Client/'+idUser).on('value', (snapshot) => {
      const data = snapshot.val();
      sessionStorage.setItem("userSession",JSON.stringify(data))
      sessionStorage.setItem("uId",idUser)
    });
  }
  function obtenerInfoAppointmentDb (idAppoint){
    return new Promise(resolve => {
      dbref.child('Appointment/'+idAppoint).on('value', (snapshot) => {
        const data = snapshot.val();
        resolve(data)
      });
    });
  }
  function deleteAppointmentDB(idAppoint){
    console.log(idAppoint)
      dbref.child('Appointment/'+idAppoint).remove().then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }
  // // var consultarAppointments= function(uid){
  //   // appointments =[]
  //   dbrefAppointment.on("value", function(snapshot) {
  //     snapshot.forEach(function(appointment) {
  //       var key = appointment.key;
  //       var valor = appointment.val();
  //       // console.log(valor)
  //       if(valor.client == uid){
  //         var actAppointment = new Appointment(key,valor.date,valor.status,valor.client,valor.specialist);
  //         appointments.push(actAppointment)
  //       }
  //       });
  //       console.log(appointments)
  //       sessionStorage.setItem("appointments",JSON.stringify(appointments))
       
  
  //   }, function (errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  //   })
    
  //   // return appointments;
  // // }


  // var consultarAppointmentsTest= function(uid){
  //   appointments =[]
  //   dbrefAppointment.on("value", function(snapshot) {
  //     snapshot.forEach(function(appointment) {
  //       var key = appointment.key;
  //       var valor = appointment.val();
  //       console.log(valor)
  //       if(valor.client == uid){
  //         var actAppointment = new Appointment(key,valor.date,valor.status,valor.client,valor.specialist);
  //         appointments.push(actAppointment)
  //       }
  //       });
  //       console.log(appointments)
  //   }, function (errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  //   })
    
  //   return appointments;
  // }
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

  var getInfoSpecialisDb = function(){
    specialists =[]
    return new Promise(resolve => {
      dbref.child('Specialist').on("value", function(snapshot) {
        snapshot.forEach(function(specialist) {
          var key = specialist.key;
          var valor = specialist.val();
            var spe = new Specialist(key,valor.name,valor.Services,valor.treatment,0421234234,valor.Services);
            specialists.push(spe)
          });
          resolve(specialists)
    });
  });
}

var updateAppointmentDB = function (id, date, specialist){
  firebase.database().ref('Appointment/' + id).update({
      date: date,
      specialist: specialist,
    });
}
