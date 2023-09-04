import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService:LoginService){}
  onSubmit(form:NgForm){
    this.loginService.loginForm(form.value.email,form.value.password);
  }
}
