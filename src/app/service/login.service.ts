import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInRouter :boolean =false

  constructor(private firebaseAuth:AngularFireAuth,private toastr:ToastrService,private router:Router) { }

  loginForm(username,password){
    this.firebaseAuth.signInWithEmailAndPassword(username,password).then(res=>{
        this.toastr.success("Logged in Successfully!")
        this.getLoginUser();
        this.loggedIn.next(true);
        this.loggedInRouter=true;
        this.router.navigate(["/"]);
    }).catch(err=>{
      this.toastr.warning("wrong credetnials");
    })
  }

  getLoginUser(){
    this.firebaseAuth.authState.subscribe(user=>{
      localStorage.setItem("user",user.email);
    })
  }

  logout(){
    this.firebaseAuth.signOut().then(res=>{
      this.toastr.success("Logged out successfully");
      this.loggedIn.next(false);
      this.loggedInRouter=false
      this.router.navigate(["/login"]);
    });
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
