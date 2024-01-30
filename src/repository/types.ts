export interface UserType {
  name?: string;
  email: string;
  password: string;
}

export interface UserRepositoryType extends UserType {
  register?(user: UserType): UserType | Promise<UserType>;
  login?(): UserType | Promise<UserType>;
  delete?(): void;
}
