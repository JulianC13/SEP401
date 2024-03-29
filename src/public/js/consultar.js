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

// Method that goes to the database and get the info of the user in session login
// params
// id: String -> id of the user that is going to be consulted
var getInfoUserDb =  function(idUser){
    dbref.child('Client/'+idUser).on('value', (snapshot) => {
      const data = snapshot.val();
      sessionStorage.setItem("userSession",JSON.stringify(data))
      sessionStorage.setItem("uId",idUser)
    });
}

// Method that goes to the database and get the info of the user in session 
// params
// id: String -> id of the user that is going to be consulted
var getUserDb =  function(idUser){
  return new Promise(resolve => {
    dbref.child('Client/'+idUser).on('value', (snapshot) => {
      const data = snapshot.val();
      resolve(data)
    });
  });
}

// Method that goes to the database and get the info of the appointment
// params
// id: String -> id of the appointment that is going to be consulted
function getInfoAppointmentDb (idAppoint){
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
  sessionStorage.removeItem("uId")
  
  location.href = '/';
  
}

// Method that returns a list of all the specialist stored in the database
var getInfoSpecialistDb = function(){
    specialists =[]
    return new Promise(resolve => {
      dbref.child('Specialist/').on("value", function(snapshot) {
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

// Method that creates and store the information of the appointment in the database
// params
// userId: String -> key of the user in the db
// appointmentDate: String -> date of the appointment
// specialistName: String -> key of the specialist in the db
var createAppointment = function (userId, appointmentDate, specialistName){
  dbrefAppointment.push().set({
    client: userId,
    date: appointmentDate,
    specialist: specialistName,
    status: true
  });
}

// Method that creates and store the information of the user in the database
// params
// name: String -> name of the user
// phone: String -> phone of the user
// docid: String -> id document of the user
// address: String -> address of the user
// email: String -> email of the user
// idU: String -> id generated by the firebase authatication module
var createUserDB = function (name, phone, docid, address, email, idU){
  firebase.database().ref('Client/' + idU).set({
    username: email,
    name: name,
    phone: phone,
    address: address,
    docid: docid
  });
}