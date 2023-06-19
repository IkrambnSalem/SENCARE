import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-confirmpassword',
  templateUrl: './reset-confirmpassword.component.html',
  styleUrls: ['./reset-confirmpassword.component.css']
})
export class ResetConfirmpasswordComponent  {
  resetPasswordForm:FormGroup;
  user:any={}
  constructor(private userService:UserService) { }

  onSubmit() {
    console.log(this.user);
  this.userService.resetConformPassword(this.user).subscribe((response)=>{
console.log("here msg from BE",response.message);

  });

  }

}
