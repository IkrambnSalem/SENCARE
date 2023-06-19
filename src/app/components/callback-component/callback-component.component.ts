import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGmailService } from 'src/app/services/login-gmail.service';

@Component({
  selector: 'app-callback-component',
  templateUrl: './callback-component.component.html',
  styleUrls: ['./callback-component.component.css']
})
export class CallbackComponentComponent implements OnInit {
  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: LoginGmailService
  ) { }

  ngOnInit() {
   
  }
}




