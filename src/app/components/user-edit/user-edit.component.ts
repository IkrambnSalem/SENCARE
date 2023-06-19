import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
user:any;
id:any;
editForm:FormGroup;
  constructor(private userService:UserService , private activatedRouter:ActivatedRoute , private router:Router) { }

  ngOnInit() {
    this.id=this.activatedRouter.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((response)=>{
      this.user=response.user;
    })
    
  }
  editUser(){
    this.userService.editUser(this.user).subscribe((response)=>{
     console.log("here msg from BE",response.message);
     this.router.navigate(["dashboard"]);
    });
  }
}
