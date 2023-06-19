import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  user: any = {};
  contactForm: FormGroup;
  assistantId: any;
  assistant: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let assistantId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Assistant ID:', assistantId);
    this.assistantId = assistantId;
    this.userService.getAssistantById(this.assistantId).subscribe((data) => {
      this.assistant = data.assistant;
    })
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.userService.getUserById(connectedUser.id).subscribe((response) => {
      this.user = response.user;
    });

  }
  contact() {

    console.log("this user", this.user);
    this.userService.contactAss(this.user, this.assistantId).subscribe((response) => {
      console.log("here msg from BE", response.message);
      this.router.navigate(["/"]);
    });
  }

}
