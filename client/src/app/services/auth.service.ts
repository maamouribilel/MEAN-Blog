import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = 'http://localhost:3000';
  authToken;
  user;
  httpOptions;
  constructor(private http: HttpClient, ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    }
  }
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user);
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email);
  }
  checkUsername(user) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + user);
  }
  login(user) {
    return this.http.post(this.domain + '/authentication/login', user);
  }
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.httpOptions);
  }
}