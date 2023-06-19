import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { VuesService } from 'src/app/services/vues.service';
import Response from 'twilio/lib/http/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assistantTab: any = [];
  assistantTabe: any = [];
  vues: any;
  numberOfAssistants: any;
  number: any;
  requestResponse: any;
  constructor(private router: Router, private userService: UserService, private vueService: VuesService, private requestService: RequestService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/') {
        window.location.reload();
      }
    });

    this.userService.getAllAsistants().subscribe((response) => {
      console.log(response.assistants);
      this.assistantTab = response.assistants;
      this.assistantTabe = response.assistants.filter((assistantTab) => assistantTab.status === 'confirmed').slice(0, 6);
      console.log("assistantTabe", this.assistantTabe);
    });

    this.vueService.addVue().subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

    this.getVues();
    this.userService.getAllAsistants().subscribe((response) => {
      this.numberOfAssistants = response.assistants.length;
      console.log("numberOfAssistants", this.numberOfAssistants);

    })

    this.userService.getAllUsers().subscribe((response) => {
      this.number = response.users.length;
      console.log("here number", this.number);

    })
    this.requestService.responseRequest().subscribe((response) => {
      this.requestResponse = response.responseReq.length;
      console.log("responseReq", this.requestResponse);

    })
  }
  getVues() {
    this.vueService.getVues().subscribe(data => {
      this.vues = data.count;
      console.log("count", this.vues);
    });
  }

}
