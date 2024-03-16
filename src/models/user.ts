export class User {
  private _name?: string;
  private _email?: string;
  private _password?: string;
  private _id?: string;
  private _image?: string;
  constructor({
    name,
    email,
    password,
    id,
    image,
  }: {
    name?: string;
    email: string;
    password?: string;
    id?: string;
    image?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
    this.image = image;
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

  get image(): string {
    return this._image;
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

  set image(image: string) {
    this._image = image;
  }
}
