import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {
  profilForm:FormGroup;;
  user:any={}
  constructor(private userService:UserService) { }

  ngOnInit() {
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.userService.getUserById(connectedUser.id).subscribe((response) => {
      this.user = response.user;
    })
  }

  
  changePassword(){
console.log("here user",this.user);
   this.userService.PorfilePassword(this.user).subscribe((response)=>{
    console.log("here response",response.message);
    
   })
  }
}
