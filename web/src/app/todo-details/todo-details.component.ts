import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ITodo, IUser } from "../shared/interfaces";

import { TodoService } from '../shared/todo.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  editable: boolean = false;
  current: ITodo ;
  todoCols1: string[] = ['description', 'done'];
  todos1: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);
  // users:IUser ;
  // usersInit = [
    // {fullName: "User ONe"},
  //   {fullName: "User Two"},
  // ];
  // toppings = new FormControl();
  // toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
    private router: Router
  ) { }

 async ngOnInit() {
    this.route.params.subscribe(async p => {
      const Todo = await this.todoService.getClass();
  //    const todoexpanded = await Todo.find(p.id, {expand: 'users'});
      this.current = await Todo.find(p.id, {expand: 'users'});

// Contruct list of todos to select for add as main todo
      const todos1 = await this.todoService.getAll({
        pageSize: 20,
        start: 0
      });
      this.todos1 = new MatTableDataSource(todos1.list);

// COntruct of the list of users concerned
    //  debugger;
   // this.users = this.current.getUsers();
     this.users = this.current.users;

     const result = await this.current.getUsers();
     const users = result.entities;
     const countUser = result._count;


    });

    this.route.data.subscribe(d => {
      this.editable = d.editable;
    });
  }

  async save(todo){
    await todo.save();
    this.router.navigate(["/todos"]);
  }

  async remove(todo){
    await this.todoService.remove(todo);
    this.router.navigate(["/todos"]);
  }

  async create(todo){
    const Todo = await this.todoService.getClass();
    this.current = Todo.create();
  }

  cancel(){
    this.editable= false;
  }

  async affect(todoSub: ITodo, todoMain: ITodo){
    debugger;
    this.current.subTodos= todoMain;
    this.save(todoSub);
  }

}


