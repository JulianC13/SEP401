class Appointment{
  constructor(id,date,status,userId,specialistId){
    this.id = id;
    this.date = date;
    this.status =status;
    this.userId = userId;
    this.specialistId = specialistId;
  }
}
module.exports = Appointment 