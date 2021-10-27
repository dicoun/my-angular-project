import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  setCredentials(login: string, pass: string) {
    localStorage.setItem('login', login);
    localStorage.setItem('pass', pass);
  }
  getCredentials(){
    let login = localStorage.getItem('login');
    let pass = localStorage.getItem('pass');
    return {'login': login, 'pass': pass};
  }
  clearCredentials(){
    localStorage.clear();
  }
  isLoggedIn():boolean{
    let login = <string>localStorage.getItem('login');
    let pass = <string>localStorage.getItem('pass');
    if((login == 'admin') && (pass == '12345')){
        return true;
    }
    return false;
  }
}