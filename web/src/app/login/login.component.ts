import { Component, OnInit } from '@angular/core';
import { WakandaService } from '../shared/wakanda.service';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  // providers: [WakandaService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User('','');
  public errorMsg = '';

  // public username: string = "username";
  // public password: string = "password";

  constructor(
 //   public wakanda: WakandaService,
    private wakandaService: WakandaService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  async login(username: string, password: string) {
    debugger;
    const isOK = await this.wakanda.login(username, password);
    if (isOK) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid username or password');
    }
  }


  // async login(username: string, password: string) {
  //   debugger;
  //   const isOK = await this.wakandaService.login(username, password);
  //   debugger;
  //   if (isOK) {
  //     this.router.navigate(['/']);
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // }

  register(){
    this.router.navigate(['register']);
  }
  
}
