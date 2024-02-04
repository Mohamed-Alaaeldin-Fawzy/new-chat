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
  getName = () => {
    return this.name;
  };
  getPassword = () => {
    return this.password;
  };
  getEmail = () => {
    return this.email;
  };
  getId = () => {
    return this.id;
  };
  setName = (name: string) => {
    this.name = name;
  };
  setPassword = (password: string) => {
    this.password = password;
  };
  setEmail = (email: string) => {
    this.email = email;
  };
  setId = (id: string) => {
    this.id = id;
  };
}
