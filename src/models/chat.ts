export class Chat {
  private _name: string;
  private _usersIds: string[];
  private _id?: string;
  constructor({
    name,
    usersIds,
    id,
  }: {
    name: string;
    usersIds: string[];
    id?: string;
  }) {
    this._name = name;
    this._usersIds = usersIds;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  get usersIds(): string[] {
    return this._usersIds;
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  set usersIds(usersIds: string[]) {
    this._usersIds = usersIds;
  }

  set id(id: string) {
    this._id = id;
  }
}
