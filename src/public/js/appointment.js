var general = []
uid = sessionStorage.getItem("uId");
specialistSelected = -1;

specialistsCards()

//section that loads when the document is ready and render the information of the user in the html
$(document).ready(function(){
  userrrr = JSON.parse(sessionStorage.getItem("userSession"));
  const myElement = document.getElementById("helloText");
  myElement.innerHTML = 'Dear '+ userrrr.name + ', please select your specialist';
  specialistSelected = -1;

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;    
  $('#appDate').attr('min', maxDate);
})

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

// Method that generate and display the html card for each of the specialist
async function specialistsCards() {
  let specialistList = await getInfoSpecialistDb();
  specialistList.forEach(specialist => {
    let startingPoint = document.getElementById("referencePoint");
    let newColumn = document.createElement("div");
    newColumn.classList.add("col-lg-4");
    newColumn.setAttribute("id", "new-column");
    startingPoint.append(newColumn);
    //console.log(newColumn);

    let newCard = document.createElement("div");
    newCard.classList.add("m-3");
    newCard.setAttribute("id", "color"+specialist.id);
    newCard.classList.add("card");
    newColumn.append(newCard);

    let specialistAvatar = document.createElement("img");
    specialistAvatar.setAttribute("src", "./img/doctor.png");
    specialistAvatar.classList.add("card-img-top");
    specialistAvatar.setAttribute("alt", "Dentist Avatar");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    newCard.appendChild(specialistAvatar);
    newCard.append(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = `<strong>Dr. ${specialist.name} <strong>`;
    cardBody.append(cardTitle);
    //console.log(cardTitle);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = `Treatment: ${specialist.treatment}`;
    cardBody.append(cardText);
    let specialistServices = specialist.speciality
    specialistServices.forEach(specialistService => {
      let service = document.createElement("li");
      service.innerHTML = specialistService;
      cardText.appendChild(service);
  
    });
    let selectSpecialistButton = document.createElement("input");
    selectSpecialistButton.setAttribute("type", "button");
    selectSpecialistButton.setAttribute("value", "Select Specialist");
    selectSpecialistButton.setAttribute("class", " form-control specialists");
    selectSpecialistButton.setAttribute("id", specialist.name);
    selectSpecialistButton.setAttribute("onclick", "selSpe("+specialist.id+")");
    cardBody.appendChild(selectSpecialistButton);
  }); 
}

// Method that handle the submit event of the appointment form
$('#appointmentForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  createAppointment(sessionStorage.getItem("uId"), data[0].value, specialistSelected.toString());
  Swal.fire('Appointment Created!').then(function() {
    location.href = '/menu';
});;
  
});

// Method that add a class to the selected card to display specail css style
$('[data-cardSelectButton]').click(function() {
  $(this).parent('[data-cardSelect]').toggleClass('is-selected');
});

// Method that handle the submit event of the appointment form
// params
// idSpecial: String -> the key of the specialist to link it to the new appointmnet
selSpe=function(idSpecial){
  var cards = document.getElementsByClassName("card");
  for(var i = 0; i < cards.length; i++)
  {
    cards[i].classList.remove("divSelected")
  }
 this.specialistSelected = idSpecial
 let col = document.getElementById("color"+idSpecial)
 col.classList.add("divSelected")
}


