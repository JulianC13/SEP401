// Class that model the entity of the appointment 
class Appointment{
  constructor(id,date,status,userId,specialistId){
    this.id = id;
    this.date = date;
    this.status =status;
    this.userId = userId;
    this.specialistId = specialistId;
  }
  setName(x){
    this.name = x;
  }
  sayHello(){
    console.log(this.name);
  }
}