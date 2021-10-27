import { Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
  
@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent { 
    username:string = '';
    constructor(private router: Router, private auth: AuthService){
        this.username = <string>auth.getCredentials().login;
    }
}