import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user:string;
  isLoggedIn$:Observable<boolean>;
  constructor(private loginService:LoginService){}

  ngOnInit(){
    this.user = localStorage.getItem('user');
    this.isLoggedIn$ = this.loginService.isLoggedIn();
    console.log(this.user);
  }

  logout(){
    this.loginService.logout();
  }
}
