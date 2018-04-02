import { Component, OnInit } from '@angular/core';
import { WakandaService } from '../shared/wakanda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // providers: [WakandaService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = "username";
  public password: string = "password";

  constructor(
 //   public wakanda: WakandaService,
    private wakanda: WakandaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login(username: string, password: string) {
    const isOK = await this.wakanda.login(username, password);
    if (isOK) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid username or password');
    }
  }
}
