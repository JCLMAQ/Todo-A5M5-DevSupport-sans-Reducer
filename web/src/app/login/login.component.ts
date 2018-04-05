import { Component, OnInit } from '@angular/core';
import { WakandaService } from '../shared/wakanda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public username: string = "username";
  // public password: string = "password";
  public username: string ;
  public password: string ;

  constructor(
    private wakandaService: WakandaService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async login(username: string, password: string) {
    const isOK = await this.wakandaService.login(username, password);
    if (isOK) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid username or password');
    }
  }

  register(){
    this.router.navigate(['register']);
  }
  
}
