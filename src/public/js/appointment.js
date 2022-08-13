
async function asyncCall() {
  let specialistList = await getInfoSpecialistDb();
  // console.log(specialistList);
  specialistList.forEach(specialist => {
    let startingPoint = document.getElementById("referencePoint");
    let newColumn = document.createElement("div");
    newColumn.classList.add("col-lg-4");
    newColumn.setAttribute("id", "new-column");
    startingPoint.append(newColumn);
    // console.log(newColumn);

    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("style", "width: 18rem; height: 18rem;");
    newColumn.append(newCard);

    let specialistAvatar = document.createElement("img");
    specialistAvatar.setAttribute("src", "./img/doctor.png");
    specialistAvatar.classList.add("card-img-top");
    specialistAvatar.setAttribute("alt", "Dentist Avatar");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    newColumn.append(specialistAvatar, cardBody);
    // console.log(specialistAvatar)

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = "<strong>Dr." + specialist.name + "<strong>";
    cardBody.append(cardTitle);
    // console.log(cardTitle);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = specialist.treatment;
    cardBody.append(cardText);
    let specialistServices = specialist.Services
    specialistServices.forEach(specialistService => {
      let service = document.createElement("li");
      service.innerHTML = specialistService;
      cardText.appendChild(service);
      // console.log(service);
    });

    let selectSpecialistButton = document.createElement("a")
    selectSpecialistButton.setAttribute("href", "#")
    // selectSpecialistButton.classList.add("btn btn-primary")
    selectSpecialistButton.innerHTML = "Select Specialist"

  });
  
}

asyncCall()

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