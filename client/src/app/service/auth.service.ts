import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from '../models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = JSON.parse(localStorage.getItem('token') || '{}')
  headers = new HttpHeaders(this.token);


  constructor(private http: HttpClient) { }

  Siginup(body : User){
    return this.http.post('https://todoappv01.herokuapp.com/auth/signup',body )
  }

  Sigin(body){
    return this.http.post('https://todoappv01.herokuapp.com/auth/login',body)
  }
  update_profile(body){
    return this.http.put('https://todoappv01.herokuapp.com/auth/profile',body)
   
}
  profile(body): Observable<User[]>{
    return this.http.post<User[]>('https://todoappv01.herokuapp.com/auth/profile', body)
 
}



}
