import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  adminConnected = false;
  assistantConnected = false;
  userConnected=false;
  user: any;
  name:string;
  searchTerm:string;
  private authListenerSubs: Subscription;
  constructor(private userService: UserService , private router:Router) { }

  ngOnInit() {
     const token = localStorage.getItem('token'); // Remplacez localStorage par le lieu où le token est stocké
    const decodedToken = jwt_decode(token);
    console.log(typeof decodedToken, decodedToken);
    if (typeof decodedToken === 'object' && decodedToken !== null && 'userType' in decodedToken && 'userRole'in decodedToken) {
      if (decodedToken['userType'] === 'assistant') {
        this.assistantConnected = true;
        console.log("assistantConnected",this.assistantConnected);
        
      }else if (decodedToken['userType'] === 'user') {
        this.userConnected=true;
        console.log("userConnected",this.userConnected);
        
      }else{
        this.adminConnected=true;
        console.log("adminConnected",this.adminConnected);
      }  
    }
    //  this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
    //   isAuthenticated => {
    //     this.userConnected = isAuthenticated;
    //     this.user =JSON.parse(localStorage.getItem('name'));
    //     console.log("user");
        
    //   });
    const namelocl = localStorage.getItem('name');
    if (namelocl) {
      this.name=namelocl;
      console.log("name",this.name);
    }
    
    
  }
  // ngOnDestroy() {
  //   this.authListenerSubs.unsubscribe();
  // }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.adminConnected = false;
    this.assistantConnected = false;
    this.userConnected=false;
    this.router.navigate(['/']);
 
  }
  // onSearch( ) {
  //   console.log(this.searchTerm);
  //  this.userService.searchFunction(this.searchTerm).subscribe((response)=>{
  //       // Do something with the response
  //     });
  // }
  
  search() {
    this.userService.searchFunction(this.searchTerm).subscribe((response) => {
      if (response.user.length > 0) {
        this.router.navigate([`/search-home/${this.searchTerm}`]);
        return; // Ajout de l'instruction return
      }
    
      this.userService.searchFunctionGender(this.searchTerm).subscribe((response) => {
        if (response.users.length > 0) {
          this.router.navigate([`/search-gender/${this.searchTerm}`]);
        }
      });
    });
  }
  
}
  

