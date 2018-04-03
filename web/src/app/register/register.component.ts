import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  private errorMsg: string;
  private user: any = {role: "user"};

  constructor(
    private registerService: RegisterService,
    private router: Router) {

  }

  ngOnInit() {
  }

  register() {
    this.registerService.register(this.user).then((result) => {
      if(result.error) {
        this.errorMsg = result.errorMessage;
      } else {
        this.router.navigate(['login']);
      }
    }).catch((errorMessage) => {
      this.errorMsg = errorMessage;
    });
  }
 login(){
  this.router.navigate(['login']);
 }
}
