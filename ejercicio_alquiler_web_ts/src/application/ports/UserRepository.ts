export interface UserRepository {
  exists(userId: string): boolean;
}
