import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-assistants',
  templateUrl: './all-assistants.component.html',
  styleUrls: ['./all-assistants.component.css']
})
export class AllAssistantsComponent implements OnInit {
  assistantTab: any = [];
  constructor(private userService: UserService , private router:Router) { }

  ngOnInit() {
  
    this.userService.getAllAsistants().subscribe((response) => {
      this.assistantTab = response.assistants
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/all-assistants') {
        window.location.reload();
      }
    });
  }
  gotoAssistant(id){
    this.router.navigate([`assistant-info/${id}`]);
      }
}
