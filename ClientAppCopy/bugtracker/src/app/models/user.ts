export class User {
  guid = "";
  firstName : string | null;
  lastName : string | null;
  place : string | null;
  email : string | null;
  password : string | null;
  type : number | null;
  token : string | null = "";


  constructor(firstName: string | null, lastName: string | null, place: string | null, email: string | null, password: string | null, type: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.place = place;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
