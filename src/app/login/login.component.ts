import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { signOut } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(public auth: Auth, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((response: any)=>{
        console.log(response.user);
        this.router.navigate(['dashboard']);

      })
      .catch((err)=>{
        alert(err.message);
      });  
  }

  

  onSubmit(){

  }


}
