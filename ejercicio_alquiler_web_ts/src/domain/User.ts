export default class User {

  private userId: string;
  private name: string;
  private email: string;
  
  constructor(userId: string, name: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

}
