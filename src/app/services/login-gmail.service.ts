import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as qs from 'qs';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGmailService {
  gmailUrl:string="http://localhost:3000/Gmail"
    private clientId = '1077179477252-esudcoothdf1hpoo8p9np2de0gsgpoue.apps.googleusercontent.com';
    private redirectUri = 'http://localhost:4200/login';
    private clientSecret = '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';
    private scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');
  constructor(private http: HttpClient , private route: ActivatedRoute , private router:Router) { }
  getAccessToken(code: string): Observable<any> {
    const tokenUrl = `https://www.googleapis.com/oauth2/v4/token`;
    const body = {
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code',
    };

    return this.http.post(tokenUrl, body);
  }

  getUserProfile(token: string): Observable<any> {
    const profileUrl = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`;
    return this.http.get(profileUrl);
  }

  login() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}&response_type=code&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  }

  handleLoginCallback(): Observable<any> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('code')),
      switchMap(code => this.getAccessToken(code)),
      map(tokenResponse => tokenResponse.access_token),
      switchMap(token => this.getUserProfile(token)),
      switchMap(userProfile => this.saveUserProfile(userProfile)),
      tap(() => {
        // Naviguer vers la page suivante après la sauvegarde réussie du profil utilisateur
        this.router.navigate(['/login-with-gmail']);
      })
    );
  }


  saveUserProfile(userProfile: any) {
    console.log("xxx",userProfile);
    
   // L'URL de votre endpoint pour sauvegarder les profils utilisateur
    return this.http.post<{savedUser:any}>(this.gmailUrl, userProfile);
  }
}