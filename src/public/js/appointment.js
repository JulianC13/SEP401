var general = []
uid = sessionStorage.getItem("uId");
specialistSelected = -1;

$(document).ready(function(){
  userrrr = JSON.parse(sessionStorage.getItem("userSession"));
  const myElement = document.getElementById("helloText");
  myElement.innerHTML = 'Dear '+ userrrr.name + ', please select your specialist';
  specialistSelected = -1;
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log("usuariooooo js loggeadoooo")
  } else {
    // No user is signed in.
    logout();
  }
});

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

specialistsCards()

var getSpecialistSelected = function(){
  const specialists = document.getElementsByClassName('specialists');
  console.log(specialists);
  // specialists.addEventListener("click", (e) => {
  //   return specialists.id;
  // });
}

let selectedSpecialist = getSpecialistSelected();



$('#appointmentForm').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  createAppointment(sessionStorage.getItem("uId"), data[0].value, specialistSelected.toString());
  Swal.fire('Appointment Created!');
});

$('[data-cardSelectButton]').click(function() {
  $(this).parent('[data-cardSelect]').toggleClass('is-selected');
});


selSpe=function(idSpecial){
 this.specialistSelected = idSpecial

}