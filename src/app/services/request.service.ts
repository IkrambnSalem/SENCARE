import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
requestUrl:string="http://localhost:3000/Request";
  constructor(private httpReq:HttpClient) { }

getAllRequests(){
  return this.httpReq.get<{requests:any}>(this.requestUrl);
}
// pour id de assistant 
getRequests(id){
  console.log("id",id);
  
  return this.httpReq.get<{requests:any}>(`${this.requestUrl}/${id}`);
}
// pour id de user 
getRequestUser(id){
  console.log("id",id);
  
  return this.httpReq.get<{requests:any}>(`${this.requestUrl}/requestUser/${id}`);
}

acceptRequest(requestId){
  return this.httpReq.put<{message:string}>(`${this.requestUrl}/${requestId}`, { status: 'accepted' });
}

refusRequest(id){
  return this.httpReq.put<{message:string}>(`${this.requestUrl+"refused"}/${id}`, { status: 'refused' });
}

responseRequest(){
  console.log("here request from fe XX");
  
  return this.httpReq.get<{responseReq:any}>(this.requestUrl + "responRequest");

}

}









