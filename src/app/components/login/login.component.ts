import { Component} from '@angular/core';
import {Router} from '@angular/router';
  
@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
    login:string = '';
    pass:string = '';
    isLoged:boolean = false;
    constructor(private router: Router){
        this.login = <string>localStorage.getItem('login');
        this.pass = <string>localStorage.getItem('pass');
    }
    doLogin(){
        localStorage.setItem('login', this.login);
        localStorage.setItem('pass', this.pass);
        this.router.navigate(['home']);
    }
    loginChange(e: any):void{
        this.login = e.target.value;
        localStorage.setItem('login', this.login);
    }
    passChange(e: any):void{
        this.pass = e.target.value;
        localStorage.setItem('pass', this.pass);
    }
}