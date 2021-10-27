import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
  
@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
    login:string = '';
    pass:string = '';
    constructor(private router: Router, private auth: AuthService){
        this.login = <string>auth.getCredentials().login;
        this.pass = <string>auth.getCredentials().pass;
    }
    doLogin(){
        this.auth.setCredentials(this.login, this.pass);
        this.router.navigate(['home']);
    }
    loginChange(e: any):void{
        this.login = e.target.value;
    }
    passChange(e: any):void{
        this.pass = e.target.value;
    }
}