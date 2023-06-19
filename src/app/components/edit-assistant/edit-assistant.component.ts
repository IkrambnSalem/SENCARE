import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-assistant',
  templateUrl: './edit-assistant.component.html',
  styleUrls: ['./edit-assistant.component.css']
})
export class EditAssistantComponent implements OnInit {
  editForm:FormGroup;
  assistant:any;
  id:any;
  constructor(private userService:UserService , private activatedRoute:ActivatedRoute , private route:Router)  { }

  ngOnInit() {
this.id= this.activatedRoute.snapshot.paramMap.get("id");
this.userService.getAssistantById(this.id).subscribe((response)=>{
  this.assistant=response.assistant;
})

  }
  editAssistant(){
  this.userService.editAssistant(this.assistant).subscribe((response)=>{
console.log(response.message);
this.route.navigate(["/assistant-table"]);
  });
  
  }
}
