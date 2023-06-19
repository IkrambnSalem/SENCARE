import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RequestService } from 'src/app/services/request.service';
import { VuesService } from 'src/app/services/vues.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  user:any={};
  numberOfAssistants:any;
  number:any;
  allRequestsTab:any;
  vues: any;
  constructor(private router: Router , private userSerice:UserService , private requestService:RequestService ,private vueService:VuesService) {}


  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/dashboard') {
        window.location.reload();
      }
    });
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
this.userSerice.getUserById(connectedUser.id).subscribe((response)=>{
  this.user=response.user;
})
this.userSerice.getAllAsistants().subscribe((response)=>{
  this.numberOfAssistants=response.assistants.length;
  console.log("numberOfAssistants",this.numberOfAssistants);
  
  })
  this.userSerice.getAllUsers().subscribe((response)=>{
    this.number=response.users.length;
    console.log("here number",this.number);
        
      })

this.requestService.getAllRequests().subscribe((response)=>{
  this.allRequestsTab=response.requests.length;
  console.log("allRequestsTab",this.allRequestsTab);
  
})
this.vueService.addVue().subscribe((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});

this.getVues();
this.userSerice.getAllAsistants().subscribe((response) => {
  this.numberOfAssistants = response.assistants.length;
  console.log("numberOfAssistants", this.numberOfAssistants);

})
    } 
    getVues() {
      this.vueService.getVues().subscribe(data => {
        this.vues = data.count;
        console.log("count", this.vues);
      });
    }
}
