export default class User {

  private id: string;
  private name: string
  private email: string;
  private phone: string;

  constructor(id: string, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  getId(): string {
    return this.id;
  }

  setName(name: string): void {
    this.name = name;
  }
  
  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getPhone(): string {
    return this.phone;
  }

  getName(): string {
    return this.name;
  }
  
  getEmail(): string {
    return this.email;
  }
  
}
