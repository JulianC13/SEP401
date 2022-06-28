var expess = require('express');
var dbref = require('../firebase');
var router = expess.Router();

var nuevosCake =[]
var nuevosIce =[]


dbref.child('items/desserts/cake/').on("value", function(snapshot) {
  snapshot.forEach(function(cakeSnapshot) {
    var key = cakeSnapshot.key;
    var valor = cakeSnapshot.val();
    nuevosCake.push({key,valor})
    }
  );
  //  console.log(nuevosCake)
}, function (errorObject) {
 console.log("The read failed: " + errorObject.code);
});

dbref.child('items/desserts/icecream/').on("value", function(snapshot) {
  snapshot.forEach(function(iceSnapshot) {
    var key = iceSnapshot.key;
    var valor = iceSnapshot.val();
      nuevosIce.push({key,valor})
    }
  );
  //  console.log(nuevosIce)
}, function (errorObject) {
 console.log("The read failed: " + errorObject.code);
});

  

router.get('/', (req,res) =>{
  res.render('index',{title: 'SEP401'});
});
router.get('/menu', (req,res) =>{
  // refresh();
  res.render('menu',{ nuevosCake: nuevosCake,nuevosIce:nuevosIce,title:'Menu'});
});

function refresh(){
  nuevosIce =[]
  nuevosCake =[]
  dbref.child('items/desserts/icecream').on("child_added", function(snapshot) {
    var key = snapshot.key;
    var valor = snapshot.val();
    nuevosIce.push({key,valor})
  }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
  });
  dbref.child('items/desserts/cake').once("child_added", function(snapshot) {
    var key = snapshot.key;
    var valor = snapshot.val();
    nuevosCake.push({key,valor})
   
  }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
  });

}
  


module.exports = router;
