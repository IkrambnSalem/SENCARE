import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent implements OnInit {
requestTab:any=[];
  constructor(private requestService:RequestService, private router:Router) { }

  ngOnInit() {
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    this.requestService.getRequests(connectedUser.id).subscribe((response)=>{
     this.requestTab=response.requests;
     console.log("hello",response.requests);
     
    });
  }
  accpetRequest(id){
this.requestService.acceptRequest(id).subscribe((response)=>{
  console.log(response.message);
})

  }
  
  refusRequest(id) {
    this.requestService.refusRequest(id).subscribe(
      (response) => {
        console.log("response", response);
        alert("refused with success");
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  
  
}
