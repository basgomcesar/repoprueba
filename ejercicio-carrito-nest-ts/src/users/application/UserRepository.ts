import User from '../domain/User';

export default interface UserRepository {
  getAllUsers(): User[];
  findUserByPhone(phone: string): boolean;
  getUserByPhone(phone: string): User | null;
  updateUser(user: User): void;
  saveUser(user: User): User;
}