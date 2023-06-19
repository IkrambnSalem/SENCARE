import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-requests',
  templateUrl: './table-requests.component.html',
  styleUrls: ['./table-requests.component.css']
})
export class TableRequestsComponent implements OnInit {
resuestTab:any=[];
user:any={};
  constructor(private requestService:RequestService,private userSerice:UserService) { }

  ngOnInit() {
    this.requestService.getAllRequests().subscribe((response)=>{
      this.resuestTab=response.requests
    })
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    this.userSerice.getUserById(connectedUser.id).subscribe((response)=>{
      this.user=response.user;
    })
    
  }

}
