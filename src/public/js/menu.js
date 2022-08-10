// // JavaScript Document
var general = []
uid = sessionStorage.getItem("uId");
dbrefAppointmentTest.on("value", data => {
  appointments = [];
  data.forEach(function(appointment) {
    var key = appointment.key;
    var valor = appointment.val();
      if(valor.client == uid ){
      var actAppointment = new Appointment(key,valor.date,valor.status,valor.client,valor.specialist);
      appointments.push(actAppointment);
      }
  });
  $('#myTable').DataTable().destroy();
  $('#myTable').DataTable({
    data: appointments,
    columnDefs: [
      { "className": "dt-center", "targets": "_all"},
      {  targets: 1,
          render: function (data, type, row, meta) {
            return '<a href="#detailsSection"><i class="detailsBut fa fa-search " id=n-"' +data+ '" ></i></a><a href="#editSection"><i type="button" class="pl-3 editBut fa fa-pencil" id=n-"' +data+ '"></i></a><i type="button" class="deleteBut colorBlue  pl-3 fa fa-trash " id=n-"' + data+ '" ></i>';
          }
      }
    ],
    columns: [
      { data: 'date' },
      { data: 'id' }
    ]
  });
  $('#myTable tbody').on('click', '.detailsBut', function () {
    console.log("HOLAAAA")
    var id = $(this).attr("Id").match(/\d+/)[0];
    getDetails(id)
  });

  $('#myTable tbody').on('click', '.editBut', function () {
    var id = $(this).attr("id").match(/\d+/)[0];
    getEdit(id)
  });
  
  $('#myTable tbody').on('click', '.deleteBut', function () {
    var id = $(this).attr("id").match(/\d+/)[0];
    deleteAppointment(id)
  });
})
 
$(document).ready(function(){
  // general = JSON.parse(sessionStorage.getItem("appointments"));
  userrrr = JSON.parse(sessionStorage.getItem("userSession"));
  const myElement = document.getElementById("helloText");
  myElement.innerHTML = 'Welcome back, '+ userrrr.name;


  
})

async function getDetails(id){
  let data = await obtenerInfoAppointmentDb(id)

  let sectionDetails = document.getElementById('detailsSection')
  let sectionEdit = document.getElementById('editSection')

  let dateDe = document.getElementById('dateDetails')
  let speDe = document.getElementById('specialistDetails')

  sectionEdit.hidden = true;
  sectionDetails.hidden = false;

  dateDe.value = data.date
  getInfoSpecialisDb().then((value) => {
    value.forEach((element) => {
      if(element.id == data.specialist)
        speDe.value =  element.name+ " - "+element.treatement
    });
  });

}

async function getEdit(id){
  let data = await obtenerInfoAppointmentDb(id)

  let sectionEdit = document.getElementById('editSection')
  let sectionDetails = document.getElementById('detailsSection')

  let idApp = document.getElementById('idAppEd')
  let prevDate = document.getElementById('dateEdit')
  let selectDom = document.getElementById("specialistEdit");

  sectionDetails.hidden = true;
  sectionEdit.hidden = false;

  prevDate.value = data.date
  idApp.value = id

  getInfoSpecialisDb().then((value) => {
    value.forEach((element) => {
      var opt = document.createElement("option");
      opt.value= element.id;
      opt.innerHTML = element.name+ " - "+element.treatement;
      selectDom.appendChild(opt);
    });
    selectDom.value = data.specialist
  });

  
}

function deleteAppointment(id){
  Swal.fire({
    title: 'Are you sure to delete this Appointment ?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAppointmentDB(id)
      Swal.fire('Appointment Deleted !')
    } 
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log("usuariooooo js loggeadoooo")
  } else {
    // No user is signed in.
    logout();
  }
});

$('#editForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  console.log(data)
  updateAppointmentDB(data[0].value,data[1].value,data[2].value)
  Swal.fire('Appointment Edited!')
});

