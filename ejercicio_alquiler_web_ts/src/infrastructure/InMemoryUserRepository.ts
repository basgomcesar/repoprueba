import User from "../domain/User";
import { UserRepository } from "../application/ports/UserRepository";
export default class InMemoryUserRepository implements UserRepository {
  static users: User[] = [];


  exists(userId: string): boolean {
    return InMemoryUserRepository.users.some(user => user.getUserId() === userId);
  }
}
