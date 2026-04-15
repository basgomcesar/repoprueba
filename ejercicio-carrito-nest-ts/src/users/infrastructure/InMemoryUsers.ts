import UserRepository from "../application/UserRepository";
import User from "../domain/User";

export default class InMemoryUsers implements UserRepository {

    static users: User[] = [];


    findUserByEmail(email: string): User | null {
        return InMemoryUsers.users.find(user => user.getEmail() === email) || null;
    }

    getAllUsers(): User[] {
        return InMemoryUsers.users;
    }
    findUserByPhone(phone: string): boolean {
        return InMemoryUsers.users.some(user => user.getPhone() === phone);
    }
    getUserByPhone(phone: string): User | null {
        return InMemoryUsers.users.find(user => user.getPhone() === phone) || null;
    }
    updateUser(user: User): void {
        InMemoryUsers.users = InMemoryUsers.users.map(u => u.getId() === user.getId() ? user : u);
    }
    saveUser(user: User): User {
        InMemoryUsers.users.push(user);
        return user;
    }
}