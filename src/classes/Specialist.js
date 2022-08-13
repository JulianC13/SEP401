class Specialist{
  constructor(id,name,speciality,phone,availability){
    this.id = id;
    this.name = name;
    this.speciality =speciality;
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
module.exports = Specialist 