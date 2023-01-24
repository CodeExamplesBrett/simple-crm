import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  logInForm: FormGroup;

  constructor(public auth: Auth, public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(){
    signInWithEmailAndPassword(this.auth, this.logInForm.value.email, this.logInForm.value.password)
      .then((response: any)=>{
        console.log(response.user);
        this.router.navigate(['dashboard']);

      })
      .catch((err)=>{
        alert(err.message);
      }); 
  }

  

}
