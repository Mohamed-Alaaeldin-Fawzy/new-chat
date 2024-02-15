export class Chat {
  private name: string;
  private usersIds: string[];
  private id?: string;
  constructor({
    name,
    usersIds,
    id,
  }: {
    name: string;
    usersIds: string[];
    id?: string;
  }) {
    this.name = name;
    this.usersIds = usersIds;
    this.id = id;
  }

  getName = () => {
    return this.name;
  };
  getUsersIds = () => {
    return this.usersIds;
  };
  getId = () => {
    return this.id;
  };
  setName = (name: string) => {
    this.name = name;
  };
  setUsersIds = (usersIds: string[]) => {
    this.usersIds = usersIds;
  };
  setId = (id: string) => {
    this.id = id;
  };
}
