import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginGmailService } from 'src/app/services/login-gmail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-with-gmail',
  templateUrl: './login-with-gmail.component.html',
  styleUrls: ['./login-with-gmail.component.css']
})
export class LoginWithGmailComponent implements OnInit {
profileUser:any;
loginForm:FormGroup
  constructor(private loginGmail:LoginGmailService , private userService:UserService) { }

  ngOnInit() {
    this.profileUser = {}; // Initialisation à une valeur par défaut
    this.loginGmail.saveUserProfile(this.profileUser).subscribe((response)=>{
      this.profileUser = response.savedUser;
      console.log("here",this.profileUser);
    })
  }
  
  login() {
    console.log(this.profileUser);
    this.userService.login(this.profileUser);

  }

}
