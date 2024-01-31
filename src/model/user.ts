// attributes only

export class User {
  name?: string;
  email: string;
  password: string;
  id?: string;
  // messages : Message[]
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
}
