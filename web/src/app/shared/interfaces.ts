export interface ITodo {
  ID: string;
  dscription: string;
  done: boolean;
  _key?: string;
  delete(): void;
  removeTodo(): void;
}

export interface IUser {
  ID: string;
  email: string;
  username: string;
  group: string;
  _key?: string;
  getTodos(): Promise<{
    entities: ITodo[];
    _count: number;
  }>;
}

