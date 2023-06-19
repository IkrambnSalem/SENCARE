import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assistant-table',
  templateUrl: './assistant-table.component.html',
  styleUrls: ['./assistant-table.component.css']
})
export class AssistantTableComponent implements OnInit {
  assistantTab: any;
  assistantConfirmed: any;
  user: any = {};
  confirmed = false;
  constructor(private userSerivce: UserService, private route: Router) { }

  ngOnInit() {
    this.userSerivce.getAllAsistants().subscribe((response) => {
      console.log(response.assistants);
      this.assistantTab = response.assistants;
      this.assistantConfirmed = response.assistants.filter((assistantTab) => assistantTab.status === 'confirmed');
      console.log("assistantConfirmed",this.assistantConfirmed);
    
    });
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.userSerivce.getUserById(connectedUser.id).subscribe((response) => {
      this.user = response.user;
    })

  }
  displayAssistant(id) {
    this.route.navigate([`display-assistant/${id}`]);
  }
  editAssistant(id) {
    this.route.navigate([`edit-assistant/${id}`]);
  }
  deleteAssistant(id) {
    this.userSerivce.deleteAssistant(id).subscribe((response) => {
      console.log("here response from BE", response.message);
      this.userSerivce.getAllAsistants().subscribe((response) => {
        console.log(response.assistants);
        this.assistantTab = response.assistants;

      });
    });

  }
  confirmedAsssitant(id) {
    this.userSerivce.confirmedAsssitant(id).subscribe((response) => {
      console.log("response", response.message);
      this.confirmed = true;
      this.userSerivce.getAllAsistants().subscribe((response) => {
        console.log(response.assistants);
        this.assistantTab = response.assistants;
        this.assistantConfirmed = response.assistants.filter((assistantTab) => assistantTab.status === 'confirmed');
        console.log("assistantConfirmed",this.assistantConfirmed);
      });
    });
  }
  
}

