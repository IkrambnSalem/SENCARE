import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-assistant',
  templateUrl: './display-assistant.component.html',
  styleUrls: ['./display-assistant.component.css']
})
export class DisplayAssistantComponent implements OnInit {
assistant:any;
id:any;
  constructor(private userService:UserService ,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
   this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getAssistantById(this.id).subscribe((response)=>{
console.log("here response from BE",response.assistant);
this.assistant=response.assistant;

    })

  }

}
