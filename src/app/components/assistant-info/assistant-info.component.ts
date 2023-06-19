import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-assistant-info',
  templateUrl: './assistant-info.component.html',
  styleUrls: ['./assistant-info.component.css']
})
export class AssistantInfoComponent implements OnInit {
  userTab:any=[];
  assistantInfo:any={};
  id:any;
  showBorders = true;
  scrollMode = 'none';
  pdfSrc:SafeResourceUrl;
  assistantId:any;
  
  constructor(private activatedRoute:ActivatedRoute , private userService:UserService , private router:Router, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
      this.userService.getAssistantById(this.id).subscribe((response)=>{
        this.assistantInfo=response.assistant;
        console.log(response.assistant);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.assistantInfo.pdf);
        console.log(this.pdfSrc); 
        this.assistantId = this.assistantInfo._id;
        console.log("gggg", this.assistantId);
        
      })
    }
  contact(){
    let connectedUser =JSON.parse(localStorage.getItem("connectedUser"));
    if (connectedUser.userType=="user") {
      this.router.navigate(["contact", this.assistantId]);
      console.log("assistantId",this.assistantId);
      
    }

  }
  
}
