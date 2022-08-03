var dbref = require('../firebase.js');


// For View 
const loginView = (req, res) => {
    res.render("", {title:'SEP401'} );
}

// router.get('/', (req,res) =>{
//     const des = new Specialist();
//     des.setName("TRRRRR");
//     des.sayHello();
//     res.render('index',{title: 'SEP401'});
//   });



module.exports =  {
    loginView
};