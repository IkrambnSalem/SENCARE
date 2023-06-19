import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
  usersTab:any=[];
  user:any={};
  constructor(private userService : UserService , private router:Router) { }

  ngOnInit() {
 this.userService.getAllUsers().subscribe((response)=>{
      console.log("here response from BE",response.users);
      
      this.usersTab=response.users;
    })
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    this.userService.getUserById(connectedUser.id).subscribe((response)=>{
      this.user=response.user;
    })
    
  }
  displayUsers(id){
this.router.navigate([`user-info/${id}`]);
  }
  editUsers(id){
    this.router.navigate([`user-edit/${id}`]);
  }
  deleteUsers(id){
    this.userService.deleteUser(id).subscribe((response)=>{
console.log("here response from BE",response.message);
this.userService.getAllUsers().subscribe((response)=>{
  console.log("here response from BE",response.users);
  
  this.usersTab=response.users;
})

    });
  }

}
