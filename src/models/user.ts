export class User {
  private name?: string;
  private email: string;
  private password?: string;
  private id?: string;
  constructor({
    name,
    email,
    password,
    id,
  }: {
    name?: string;
    email: string;
    password: string;
    id?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  getName = (): string => {
    return this.name;
  };

  getPassword = (): string => {
    return this.password;
  };

  getEmail = (): string => {
    return this.email;
  };

  getId = (): string => {
    return this.id;
  };

  setName = (name: string): void => {
    this.name = name;
  };

  setPassword = (password: string): void => {
    this.password = password;
  };

  setEmail = (email: string): void => {
    this.email = email;
  };

  setId = (id: string): void => {
    this.id = id;
  };
}
