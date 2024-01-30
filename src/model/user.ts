// attributes only

export class User {
  name?: string;
  email: string;
  password: string;
  id?: string;

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
    _id?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }
  getPassword(): string {
    return this.password;
  }
  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }
}

// router(controller(repository))
