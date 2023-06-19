import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
 user:any;
 id:any;
 pdfSrc:any;
  constructor(private userService:UserService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((response)=>{
      console.log("here user from BE",response.user);
      this.user=response.user;
   
    });
  }

}
