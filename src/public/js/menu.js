// // JavaScript Document
var general = []
uid = sessionStorage.getItem("uId");

//section that loads when the document is ready and render the information of the user in the html
$(document).ready(function(){
  userrrr = JSON.parse(sessionStorage.getItem("userSession"));
  const myElement = document.getElementById("helloText");
  myElement.innerHTML =  userrrr.name;

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;    
  $('#dateEdit').attr('min', maxDate);
})

// Method that loads in realtime the list of appointments asosicated to an user
dbrefAppointment.on("value", data => {
  userSe = JSON.parse(sessionStorage.getItem("userSession"));
  appointments = [];
  data.forEach(function(appointment) {
    var key = appointment.key;
    var valor = appointment.val();
    var actAppointment = new Appointment(key,valor.date,valor.status,valor.client,valor.specialist);
      if(userSe.admin){
        let columnaAdmin = document.getElementById('adminCol')
        columnaAdmin.hidden = false;
        appointments.push(actAppointment);
      }else{
        if(valor.client == uid ){
          appointments.push(actAppointment);
          }
      }
      
  });
  $('#myTable').DataTable().destroy();
  if(userSe.admin){
    $('#myTable').DataTable({
      data: appointments,
      columnDefs: [
        { "className": "dt-center", "targets": "_all"},
        {  targets: 1,
            render: function (data, type, row, meta) {
              return '<a href="#detailsSection"><i class="pl-3 detailsBut fa fa-search " id="' +data+ '" ></i></a><a href="#editSection"><i type="button" class="pl-3 editBut fa fa-pencil" id="' +data+ '"></i></a><i type="button" class="deleteBut colorBlue  pl-3 fa fa-trash " id="' + data+ '" ></i>';
            }
        },
        {  targets: 2,
          render: function (data, type, row, meta) {
            return '<a href="#userDetails"><i class="userBut fa fa-user " id="' +data+ '" ></i></a>'
           }
      }
      ],
      columns: [
        { data: 'date' },
        { data: 'id' },
        { data: 'userId' }
      ],
      initComplete: function () {
        $("#tableContainer").removeClass("loading");
      } 
    });
  }else{
    $('#myTable').DataTable({
      data: appointments,
      columnDefs: [
        { "className": "dt-center", "targets": "_all"},
        {  targets: 1,
            render: function (data, type, row, meta) {
              return '<a href="#detailsSection"><i class="detailsBut fa fa-search " id="' +data+ '" ></i></a><a href="#editSection"><i type="button" class="pl-3 editBut fa fa-pencil" id="' +data+ '"></i></a><i type="button" class="deleteBut colorBlue  pl-3 fa fa-trash " id="' + data+ '" ></i>';
            }
        }
        
      ],
      columns: [
        { data: 'date' },
        { data: 'id' }
      ],
      initComplete: function () {
        $("#tableContainer").removeClass("loading");
      } 
    });
  }
 
  $('#myTable tbody').on('click', '.detailsBut', function () {
    var id = $(this).attr("Id");
    getDetails(id)
  });

  $('#myTable tbody').on('click', '.editBut', function () {
    var id = $(this).attr("id");
    getEdit(id)
  });
  
  $('#myTable tbody').on('click', '.deleteBut', function () {
    var id = $(this).attr("id");
    deleteAppointment(id)
  });

  $('#myTable tbody').on('click', '.userBut', function () {
    var id = $(this).attr("id");
    getUser(id)
  });
})



// Method that allows to get the details of determinated appointment and show them in the html
// params
// id: String -> id of the appointment that is going to be consulted
async function getDetails(id){
  let data = await getInfoAppointmentDb(id)

  let sectionDetails = document.getElementById('detailsSection')
  let sectionEdit = document.getElementById('editSection')
  let sectionUser = document.getElementById('userDetails')

  let dateDe = document.getElementById('dateDetails')
  let speDe = document.getElementById('specialistDetails')

  sectionEdit.hidden = true;
  sectionDetails.hidden = false;
  sectionUser.hidden = true;

  dateDe.value = data.date
  getInfoSpecialistDb().then((value) => {
    value.forEach((element) => {
      if(element.id == data.specialist)
        speDe.value =  element.name+ " - "+element.treatement
    });
  });

}

// Method that allows to get the details of determinated appointment and show allows the edition of the inputs in the html
// params
// id: String -> id of the appointment that is going to be edited
async function getEdit(id){
  let data = await getInfoAppointmentDb(id)

  let sectionEdit = document.getElementById('editSection')
  let sectionDetails = document.getElementById('detailsSection')
  let sectionUser = document.getElementById('userDetails')

  let idApp = document.getElementById('idAppEd')
  let prevDate = document.getElementById('dateEdit')
  let selectDom = document.getElementById("specialistEdit");

  if(selectDom.options != undefined){
    while (selectDom.options.length > 0) {                
      selectDom.remove(0);
    }   
  }
  sectionDetails.hidden = true;
  sectionEdit.hidden = false;
  sectionUser.hidden = true;

  prevDate.value = data.date
  idApp.value = id

  getInfoSpecialistDb().then((value) => {
    value.forEach((element) => {
      var opt = document.createElement("option");
      opt.value= element.id;
      opt.innerHTML = element.name+ " - "+element.treatment;
      selectDom.appendChild(opt);
    });
    selectDom.value = data.specialist
  });

  
}

// Method that allows to get the details of the user asosiated to the appointment 
// params
// id: String -> id of the appointment that is going to be edited
async function getUser(id){
  let data = await getUserDb(id)
  let sectionEdit = document.getElementById('editSection')
  let sectionDetails = document.getElementById('detailsSection')
  let sectionUser = document.getElementById('userDetails')


  let nameDet = document.getElementById('nameDet')
  let addressDet = document.getElementById('addressDet')
  let phoneDet = document.getElementById("phoneDet")
  let emailDet = document.getElementById("emailDet");
  let docDet = document.getElementById("docDet")

  sectionDetails.hidden = true;
  sectionEdit.hidden = true;
  sectionUser.hidden = false;

  nameDet.value =data.name
  addressDet.value =data.address
  phoneDet.value =data.address
  emailDet.value =data.username
  docDet.value =data.docid
}

// Method that allows to delete determinated appointment
// params
// id: String -> id of the appointment that is going to be deleted
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

// Method that handle the submit event of the edit appointment form
$('#editForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  // console.log(data)
  updateAppointmentDB(data[0].value,data[1].value,data[2].value)
  Swal.fire('Appointment Edited!')
});

