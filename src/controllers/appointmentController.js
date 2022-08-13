// For View 
const appointmentView = (req, res) => {

    res.render("appointment", {title:'Appointment ', appoId: req.params.appointmentId} );
   
}
module.exports =  {
    appointmentView
};