import UserRepository from "../application/UserRepository";
import User from "../domain/User";

export default class InMemoryUsers implements UserRepository {
  getAllUsers(): User[] {
      throw new Error("Method not implemented.");
  }
  findUserByPhone(phone: string): boolean {
      throw new Error("Method not implemented.");
  }
  getUserByPhone(phone: string): User | null {
      throw new Error("Method not implemented.");
  }
  updateUser(user: User): void {
      throw new Error("Method not implemented.");
  }
  saveUser(user: User): User {
      throw new Error("Method not implemented.");
  }

  static users: User[] = [];


}