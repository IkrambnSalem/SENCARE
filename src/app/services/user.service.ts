import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {
userUrl:string="http://localhost:3000/User"
public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private isAdminConnected=false;
  private name: string;
  constructor(private httpClient :HttpClient, private router:Router ) { }
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isAdminConnecte(){
    return this.isAdminConnected;
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.name;
}
  signup(obj, img: File,pdf:File) {
    console.log("obj", obj);
    
    let formData = new FormData();
    formData.append("userType", obj.userType);
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("phoneNumber", obj.phoneNumber);
    formData.append("address", obj.address);
    formData.append("experience", obj.experience);
    formData.append("price", obj.price);
    formData.append("gender", obj.gender);
    formData.append("birthday", obj.birthday);
    formData.append("role", obj.role);
    formData.append("img", img);
    formData.append("pdf", pdf);
    return this.httpClient.post<{ message: string }>(this.userUrl + "/subscription", formData);
  }

  login(obj){
    console.log("here obj http",obj);
   return this.httpClient.post<{message:string,user:any}>(this.userUrl + "/signin",obj).subscribe((res)=>{
    console.log("here response", res);
       let connectedUser=res.user;
        const token = res.user.jwt;
        this.token = token;
        if (res.user) {
          this.isUserAuthenticated = true;
          this.name = res.user.firstName + "" + res.user.lastName;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', this.name);
          localStorage.setItem('connectedUser',JSON.stringify(connectedUser));
          this.router.navigate(['/']);
        }
   })
  
   
  }

  getAllAsistants(){
   return this.httpClient.get<{assistants:any}>(this.userUrl);
  }
  getAllUsers(){
    return this.httpClient.get<{users:any}>(this.userUrl+"/users"); 
   }

  getAssistantById(id){
    console.log("here id", id);
    return this.httpClient.get<{assistant:any}>(`${this.userUrl}/${id}`);
  }
  getUserById(id){
    console.log("here id", id);
return this.httpClient.get<{user:any}>(`${this.userUrl+"/user"}/${id}`)
  }
  editUser(newObj){
    console.log(newObj);
    
return this.httpClient.put<{newUser:any,message:string}>(this.userUrl,newObj)
  }
  editAssistant(newAssis){
    return this.httpClient.put<{message:string}>(this.userUrl+"/Assistant",newAssis);
  }
  deleteUser(id){
    return this.httpClient.delete<{message:string}>(`${this.userUrl}/${id}`);
  }
  deleteAssistant(id){
    return this.httpClient.delete<{message:any}>(`${this.userUrl+"/deleteAss"}/${id}`);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
  resetPassword(email: string) {
    console.log("here email from FE",email);
    return this.httpClient.post<{message:string}>(this.userUrl + "/sendinblue",  email );

  }
  resetConformPassword(obj){
return this.httpClient.post<{message:string}>(this.userUrl+"/confirmPassword",obj);
  }
  contactAss(obj,id){
    console.log("here obj from FE",obj);
    return this.httpClient.post<{message:any}>(`${this.userUrl}/contactAss/${id}`, obj);
  }

  // getUserByIdToken(id){
  //   const decodedToken = jwt_decode(this.token);
  //   console.log("decodedToken",decodedToken);
  //   return this.httpClient.get<{ data: any }>(`${this.userUrl}/${id}`);
    
  // }
  PorfilePassword(newobj){
    return this.httpClient.put<{message:any}>(this.userUrl+"/profilePassword",newobj);

  }
  editPorifle(newObj){
    return this.httpClient.put<{message:any}>(this.userUrl+"/editPorifle",newObj);
  }
  confirmedAsssitant(id){
    return this.httpClient.put<{message:String}>(`${this.userUrl}/confirmed/${id}`,{ status: 'confirmed' })

  }

  searchFunction(term){
    return this.httpClient.get<{user:any}>(`${this.userUrl}/search/${term}`);
  }
  searchFunctionGender(term){
    return this.httpClient.get<{users:any}>(`${this.userUrl}/Gender/${term}`);
  }
  
    
}
