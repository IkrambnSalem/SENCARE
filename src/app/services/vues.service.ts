import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VuesService {
  vueUrl:string="http://localhost:3000/Vue";
  constructor(private httpVue:HttpClient) { }

  addVue(): Observable<{ message: string }> {
    console.log('Envoi d\'une requête pour ajouter une vue...');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { data: 'Données à envoyer' };
    return this.httpVue.post<{ message: string }>(`${this.vueUrl}`, body, { headers });
  }
  
  getVues() {
    return this.httpVue.get<{ count: number }>(this.vueUrl);
  }

}
