import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
assistantTab:any=[];
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getAllAsistants().subscribe((response)=>{
      this.assistantTab=response.assistants;
    });
  }


}
