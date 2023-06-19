import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  resetPassword: FormGroup;
  constructor( private http: HttpClient , private userService :UserService , private formBuilder:FormBuilder, private route:Router) { }

  ngOnInit() {
  
    this.resetPassword=this.formBuilder.group({
      email: ['', [Validators.required]],
     
    })
  }
  
  resetPasswordd() {
    console.log(this.resetPassword.value);
      
    this.userService.resetPassword(this.resetPassword.value).subscribe(
    
      response => {
        console.log(response.message);
      },
     
    );
   this.route.navigate(['reset-confirmpassword']);
  }
}
