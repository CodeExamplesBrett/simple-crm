import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(public auth: Auth, public router: Router, private fb: FormBuilder, public ls: LoginService) { }

  ngOnInit(): void {
    this.ls.openSidenav = false
    
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  onSubmit(){
    createUserWithEmailAndPassword(this.auth, this.signUpForm.value.email, this.signUpForm.value.password)
      .then((response: any)=>{
        console.log(response.user);
        this.router.navigate(['login']);
      })
      .catch((err)=>{
        alert(err.message);
      });

  }

}
