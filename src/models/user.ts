export class User {
  private _name?: string;
  private _email?: string;
  private _password?: string;
  private _id?: string;

  constructor({
    name,
    email,
    password,
    id,
  }: {
    name?: string;
    email: string;
    password?: string;
    id?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  set password(password: string) {
    this._password = password;
  }

  set id(id: string) {
    this._id = id;
  }

  set email(email: string) {
    this._email = email;
  }
}
