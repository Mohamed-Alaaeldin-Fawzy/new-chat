// attributes only

export class User {
  public name?: string;
  public email: string;
  public password: string;
  public id?: string;
  public _id?: string;

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

  get_id(): string {
    return this._id;
  }
}

// router(controller(repository))
