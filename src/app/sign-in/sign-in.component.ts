import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email = '';
  password = '';

  constructor(public auth: Auth) { }

  ngOnInit(): void {
  }

  signIn(){
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((response: any)=>{
        console.log(response.user);
      })
      .catch((err)=>{
        alert(err.message);
      });

  }

}
