import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  profilForm:FormGroup;
user:any={};
birthday:string;
  constructor(private userServcie:UserService) { }

  ngOnInit() {
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    this.userServcie.getUserById(connectedUser.id).subscribe((response)=>{
      this.birthday = new Date(response.user.birthday).toISOString().substring(0, 10);
      this.user=response.user;
    })
  }

}
