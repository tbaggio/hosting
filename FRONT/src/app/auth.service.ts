import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userInfo: User){
    localStorage.setItem('x-access-token', "access_token");
  }

  public isLoggedIn(){
    return localStorage.getItem('x-access-token') !== null;

  }

  public logout(){
    localStorage.removeItem('x-access-token');
  }
}
