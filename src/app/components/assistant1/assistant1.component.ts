import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assistant1',
  templateUrl: './assistant1.component.html',
  styleUrls: ['./assistant1.component.css']
})
export class Assistant1Component implements OnInit {
  @Input() X:any;
  
  constructor(private router:Router) { 

  }

  ngOnInit() {
    
  }
  gotoMap(address: string) {
    this.router.navigate(['/google-maps'], { queryParams: { address: address } });
  }
  
  gotoAssistant(id){
    this.router.navigate([`assistant-info/${id}`]);
  }
}
