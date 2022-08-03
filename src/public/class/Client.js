class Client{
  constructor(id,name,email,address,phone,username){
    this.id = id;
    this.name = name;
    this.email =email;
    this.address = address;
    this.phone = phone;
    this.username =username
  }
  setName(x){
    this.name = x;
  }
  sayHello(){
    console.log(this.name);
  }
}

