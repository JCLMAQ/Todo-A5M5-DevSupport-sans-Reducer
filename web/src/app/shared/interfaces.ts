export interface ITodo {
  ID: string;
  description: string;
  done: boolean;
  _key?: string;
}

export interface IUser {
  ID: string;
  email: string;
  fullname: string;
  group ?: string;
  _key?: string;
  getTodos(): Promise<{
    entities: ITodo[];
    _count: number;
  }>;
}