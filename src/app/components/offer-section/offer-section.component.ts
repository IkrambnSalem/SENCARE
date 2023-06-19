import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-offer-section',
  templateUrl: './offer-section.component.html',
  styleUrls: ['./offer-section.component.css']
})
export class OfferSectionComponent implements OnInit {
  constructor( private router:Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/') {
        window.location.reload();
      }
    });
  }

}
