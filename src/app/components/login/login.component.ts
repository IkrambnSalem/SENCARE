import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGmailService } from 'src/app/services/login-gmail.service';

// import { GoogleAuthService } from 'src/app/services/googleauthservice.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userProfile: any;
  savedUser:any;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private loginService: LoginGmailService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, this.loginValidator]],
      password: ['', [Validators.required]]
    })
    this.loginService.handleLoginCallback().subscribe(
      userProfile => {
        this.userProfile = userProfile;
        console.log('User profile:', userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      },
      error => {
        console.error('Error while logging in:', error);
      }
    );

 
  }
 
  login() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value);

  }

  loginValidator(control: FormControl) {
    const value = control.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return { invalidLogin: true };
    }
    return null;
  }

  loginWithGoogle() {

    this.loginService.login();
  }

}


