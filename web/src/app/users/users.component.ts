import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { IUser, ITodo } from '../shared/interfaces';
import { MatTableDataSource, MatPaginator } from '../shared/material.module';
import { TodoService } from '../shared/todo.service';
import { WakandaService } from '../shared/wakanda.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  current: IUser;
  currentTodo: ITodo;
  usersCount: number;
  todoCount: number;
  userCols: string[] = ['name', 'username'];
  users: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  todoCols: string[] = ['name', 'done', 'actions'];
  todoCols1: string[] = ['name', 'done'];
  todos: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);
  todos1: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);

  @ViewChild(MatPaginator) usersPaginator: MatPaginator;

  constructor(
    private service: UserService,
    private todosService: TodoService,
    private wakanda: WakandaService
  ) { }

  async ngOnInit() {
    const result = await this.service.getAll();
    const todos = await this.todosService.getAll({
      pageSize: 20,
      start: 0
    });
    this.todos1 = new MatTableDataSource(todos.list);
    this.setData(result);
  }

  async select(user: IUser){
    const result = await user.getTodos();
    this.todos = new MatTableDataSource(result.entities);
    this.todoCount = result._count;
    this.current = user;
  }

  async onNavigate(p) {
    const result = await this.service.getAll({
      pageSize: p.pageSize,
      start: p.pageSize*p.pageIndex
    });

    this.setData(result);
  }

  setData(d: {
    list: IUser[];
    count: number;
  }) {
    this.users = new MatTableDataSource(d.list);
    this.usersCount = d.count;
  }

  async affect(user: IUser, todo: ITodo){
    const ds = await this.wakanda.catalog;
    const relation = ds.TodoUser.create();
    relation.userAssign = user;
    relation.todoAssign = todo;
    relation.save();
  }

  async removeFromUser(user: IUser, todo: ITodo){
    const ds = await this.wakanda.catalog;
    const relation = await ds.TodoUser.query({
      filter: 'user.ID == :1 && todo.ID == :2',
      params: [user.ID, todo.ID],
      pageSize: 1
    });

    if(relation.entities.length){
      await relation.entities[0].delete();
    }

    this.select(user);
  }

  async removeTodo(todo: ITodo){
    await todo.removeTodo();
    this.select(this.current);
  }
}
