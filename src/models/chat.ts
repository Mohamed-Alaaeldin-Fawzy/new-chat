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

  getName = (): string => {
    return this.name;
  };

  getUsersIds = (): string[] => {
    return this.usersIds;
  };

  getId = (): string => {
    return this.id;
  };

  setName = (name: string): void => {
    this.name = name;
  };

  setUsersIds = (usersIds: string[]): void => {
    this.usersIds = usersIds;
  };

  setId = (id: string): void => {
    this.id = id;
  };
}
