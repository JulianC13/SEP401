

const menuView = (req, res) => {
     res.render("menu", {title:'MENU'} );
}

// function loadSpecialist(){  
//     dbref.child('items/desserts/cake/').on("value", function(snapshot) {
    
//         nuevosCake =[]
//         snapshot.forEach(function(cakeSnapshot) {
//           var key = cakeSnapshot.key;
//           var valor = cakeSnapshot.val();
//           nuevosCake.push({key,valor})
//           }
//         );
//         //  console.log(nuevosCake)
//       }, function (errorObject) {
//        console.log("The read failed: " + errorObject.code);
//       });
      
// }





module.exports =  {
    menuView
};