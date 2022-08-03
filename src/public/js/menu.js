// // JavaScript Document
var general = []

  


$(document).ready(function(){
  general = JSON.parse(sessionStorage.getItem("appointments"));
  userrrr = JSON.parse(sessionStorage.getItem("userSession"));
  console.log(general)
  console.log(userrrr)
  const myElement = document.getElementById("helloText");
  myElement.innerHTML = 'Welcome back, '+ userrrr.name

  

  $('#myTable').DataTable({
    data: general,
    columnDefs: [
      {  targets: 4,
         render: function (data, type, row, meta) {
            return '<input type="button" class="name form-control" id=n-"' + meta.row + '" value="See"/>';
         }

      }
    ],
    columns: [
      { data: 'id' },
      { data: 'date' },
      { data: 'specialistId',
        render: function ( data, type, row ) {
        return data;
      }},
      { data: 'status' }
  ]
  });

  $('#myTable tbody').on('click', '.name', function () {
    var id = $(this).attr("Id").match(/\d+/)[0];

    var data = $('#myTable').DataTable().row( id ).data();
    console.log(id);
    editAppointment(data.id)
    console.log(data.id);
  });
    
    
  $('#myTable tbody').on('click', '.salary', function () {
    var id = $(this).attr("id").match(/\d+/)[0];
    var data = $('#myTable').DataTable().row( id ).data();
    console.log(data[5]);
  });

  editAppointment = function(dataId){
    location.href = '/appointment/'+dataId;
  }
  // const bodyTable =document.getElementById("tablebody");
  // body = '<tr>'
  // body += "<td>"
  // bodyTable.innerHTML = '<tr>'
  // $(document).ready( function () {
  //   var table = $('#example').DataTable({
  //     columnDefs: [
  //       {  targets: 1,
  //          render: function (data, type, row, meta) {
  //             return '<input type="button" class="name" id=n-"' + meta.row + '" value="Name"/><input type="button" class="salary" id=s-"' + meta.row + '" value="Salary"/>';
  //          }
  
  //       }
  //     ]
  //   });
    
  // $('#example tbody').on('click', '.name', function () {
  //   var id = $(this).attr("id").match(/\d+/)[0];
  //   var data = $('#example').DataTable().row( id ).data();
  //   console.log(data[0]);
  // });
    
    
  // $('#example tbody').on('click', '.salary', function () {
  //   var id = $(this).attr("id").match(/\d+/)[0];
  //   var data = $('#example').DataTable().row( id ).data();
  //   console.log(data[5]);
  // });
    
  // } );


})




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    this.userId = user.uid
    console.log("usuariooooo js loggeadoooo")
  } else {
    // No user is signed in.
    logout();
  }
});