import User from '../domain/User';

export default interface UserRepository {
  findUserByEmail(email: string): User | null;
  getAllUsers(): User[];
  findUserByPhone(phone: string): boolean;
  getUserByPhone(phone: string): User | null;
  updateUser(user: User): void;
  saveUser(user: User): User;
}