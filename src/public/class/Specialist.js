// Class that model the entity of the Specialist 
class Specialist{
  constructor(id,name,speciality,treatement,phone,availability){
    this.id = id;
    this.name = name;
    this.speciality =speciality;
    this.treatement =treatement;
    this.phone = phone;
    this.availability =availability
  }
  
  setName(x){
    this.name = x;
  }
  sayHello(){
    console.log(this.name);
  }
}