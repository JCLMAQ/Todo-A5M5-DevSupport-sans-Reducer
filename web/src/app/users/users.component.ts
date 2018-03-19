import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { IUser, ITodo } from '../shared/interfaces';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  current: IUser;
  usersCount: number;
  todoCount: number;
  userCols: string[] = ['name', 'username'];
  users: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  todoCols: string[] = ['name', 'done'];
  todos: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);

  @ViewChild(MatPaginator) usersPaginator: MatPaginator;

  constructor(
    private service: UserService
  ) { }

  async ngOnInit() {
    const result = await this.service.getAll();
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
}

