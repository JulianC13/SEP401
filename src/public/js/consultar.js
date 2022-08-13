
// properties of the firebase connection
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
// initialization of firebase
firebase.initializeApp(firebaseConfig);

// creation of the general reference of the database
var dbref= firebase.database().ref();

// creation of the references of the database for each class
var dbrefAppointment= firebase.database().ref('/Appointment');
var dbrefClient= firebase.database().ref().child('Client');
var dbrefSpecialist= firebase.database().ref().child('Specialist');

//General variables
var appointments =[]
let usuarioEnSesionId = null

// Method that goes to the database and get the info of the user in session 
// params
// id: String -> id of the user that is going to be consulted
var obtenerInfoUserDb =  function(idUser){
    dbref.child('Client/'+idUser).on('value', (snapshot) => {
      const data = snapshot.val();
      sessionStorage.setItem("userSession",JSON.stringify(data))
      sessionStorage.setItem("uId",idUser)
    });

 
}

// Method that goes to the database and get the info of the appointment
// params
// id: String -> id of the appointment that is going to be consulted
function obtenerInfoAppointmentDb (idAppoint){
  return new Promise(resolve => {
    dbref.child('Appointment/'+idAppoint).on('value', (snapshot) => {
      const data = snapshot.val();
      resolve(data)
    });
  });
}

// Method that goes to the database and delete the appointment
// params
// id: String -> id of the appointment that is going to be deleted
function deleteAppointmentDB(idAppoint){
    dbref.child('Appointment/'+idAppoint).remove().then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
}

// Method that returns to external classes the goblar varible appointments
getAppointments=function(){
  return appointments
}

// Method that removes session and logout
var logout = function (){
  firebase.auth().signOut();
  sessionStorage.removeItem("appointments")
  sessionStorage.removeItem("userSession")
  location.href = '/';
  
}

// Method that returns a list of all the specialist stored in the database
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

// Method that updates an appointment  in the database
// params 
// id: String -> id of the appointment that is going to be updated 
// date: String -> the new date of the appointment
// specialist: String-> the id of the new specialist that is going to be assigned to the appointment
var updateAppointmentDB = function (id, date, specialist){
  firebase.database().ref('Appointment/' + id).update({
      date: date,
      specialist: specialist,
    });
}

var getInfoSpecialistDb = function(){
  return new Promise(resolve => {
    dbref.child('Specialist/').on('value', (snapshot) => {
      const data = snapshot.val();
      resolve(data)
    });
  });
}