import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-dashboard-user',
  templateUrl: './table-dashboard-user.component.html',
  styleUrls: ['./table-dashboard-user.component.css']
})
export class TableDashboardUserComponent implements OnInit {
usersTab:any=[];
idAssistant:any;
assistantName: string;
  constructor(private userService:UserService , private requestService:RequestService) { }

  ngOnInit() {
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    console.log("connectedUser",connectedUser);
    
    this.requestService.getRequestUser(connectedUser.id).subscribe(
      response => {
        console.log("response.requests",response.requests);
        this.usersTab=response.requests;
        this.idAssistant=response.requests.assistantId;
      }
    );
    this.userService.getAssistantById(this.idAssistant).subscribe((response) => {
      this.assistantName = response.assistant.firstName;
      console.log("here assistantName",this.assistantName);
      
    });
  }


}
