import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NominatedService {
  private apiUrl = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) { }

  geocode(address: string): Observable<any> {
    const params = {
      q: address,
      format: 'jsonv2'
    };
    return this.http.get(`${this.apiUrl}search`, { params });
  }

}
