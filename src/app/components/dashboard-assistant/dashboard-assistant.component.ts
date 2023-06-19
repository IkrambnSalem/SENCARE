import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-assistant',
  templateUrl: './dashboard-assistant.component.html',
  styleUrls: ['./dashboard-assistant.component.css']
})
export class DashboardAssistantComponent implements OnInit {
  user:any={};
  constructor(private userSerice:UserService) { }

  ngOnInit() {
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
this.userSerice.getUserById(connectedUser.id).subscribe((response)=>{
  this.user=response.user;
})

  }

}
