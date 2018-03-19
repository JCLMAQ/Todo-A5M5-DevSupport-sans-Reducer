export interface ITodo {
  ID: string;
  description: string;
  done: boolean;
  _key?: string;
  delete(): void;
  removeTodo(): void;
}

export interface IUser {
  ID: string;
  email: string;
  fullName: string;
  group: string;
  _key?: string;
  getTodos(): Promise<{
    entities: ITodo[];
    _count: number;
  }>;
}

