import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any={};
  searchTerm: string;
  constructor(private router: Router,private userSerice:UserService) {}


  ngOnInit(){
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url === '/dashboard') {
    //     window.location.reload();
    //   }
    // });
    let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    this.userSerice.getUserById(connectedUser.id).subscribe((response)=>{
      this.user=response.user;
    })
    
    } 
    
    searchFunction(){
      console.log(this.searchTerm);
   this.userSerice.searchFunction(this.searchTerm).subscribe((response)=>{
        // Do something with the response
      });
    }
    
    
  
  }


