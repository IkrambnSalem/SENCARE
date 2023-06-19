import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

// import * as L from 'leaflet';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})

export class GoogleMapsComponent implements OnInit {
  latitude: number;
longitude: number;

markerLatitude: number;
markerLongitude: number;


address: string;
map: any;
 
  
    constructor(private route:ActivatedRoute,private http:HttpClient) { }

    ngOnInit() {

    // this.loadMap();
  
  }
 
  // loadMap() {
  //   this.address = this.route.snapshot.queryParams['address'];
  //   console.log("address", this.address);
  
  //   this.map = L.map('map').setView([0, 0], 13);
  
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  //       '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  //       'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1
  //   }).addTo(this.map);
  
  //   this.http.get<any>(`https://nominatim.openstreetmap.org/search?q=${this.address}&format=json`).subscribe(data => {
  //     const latitude = data[0].lat;
  //     const longitude = data[0].lon;
  
  //     L.marker([latitude, longitude]).addTo(this.map);
  //     this.map.setView([latitude, longitude], 13);
  //   });
  // }
  

  }
 
