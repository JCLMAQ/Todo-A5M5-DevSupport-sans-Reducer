export interface ITodo {
  ID: string;
  description: string;
  done: boolean;
  _key?: string;
  users?:IUser;
  subTodos? :ITodo;
  mainTodo? : ITodo;
  delete(): void;
  removeTodo(): void;
  getUsers(): Promise<{
    entities: IUser[];
    _count: number;
  }>;
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

export interface ITodoType {
  ID: string;
  choiceDescription: string;
  choiceCategory: string;
  _key?: string;
  todoTyped: ITodo;
}