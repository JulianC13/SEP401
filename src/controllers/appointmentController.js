
// For View 
const appointmentView = (req, res) => {

    res.render("appointment", {title:'Appointment '+req.params.appointmentId, appoId: req.params.appointmentId} );
   
}

// router.get('/', (req,res) =>{
//     const des = new Specialist();
//     des.setName("TRRRRR");
//     des.sayHello();
//     res.render('index',{title: 'SEP401'});
//   });



module.exports =  {
    appointmentView
};