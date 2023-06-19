import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  term: string;
  userfinded: any={};
  pdfSrc:any;
  searchTerm: string;
  firstname:any;
  assistantId:any;
    showBorders = true;
  scrollMode = 'none';
  constructor(private userService:UserService , private route:ActivatedRoute , private router:Router,private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('term');
    console.log("here seachTearm",this.searchTerm);
    this.userService.searchFunction(this.searchTerm).subscribe(response => {
      this.userfinded = response.user;
      console.log("here response",this.userfinded);
      this.firstname = response.user[0].firstName;
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(response.user[0].pdf);
      console.log("pdf",this.pdfSrc);
      
      console.log(this.firstname);
      
   
      console.log(this.userfinded);
    });
  }
  contact(){
    let connectedUser =JSON.parse(localStorage.getItem("connectedUser"));
    if (connectedUser.userType=="user") {
      this.router.navigate(["contact", this.assistantId]);
      console.log("assistantId",this.assistantId);
      
    }

}
}
