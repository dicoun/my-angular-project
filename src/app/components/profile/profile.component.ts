import { Component} from '@angular/core';
import {Router} from '@angular/router';
  
@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent { 
    username:string = '';
    constructor(private router: Router){
        this.username = <string>localStorage.getItem('login');
    }
    doLogout(){
        localStorage.clear();
        this.router.navigate(['login']);
    }
}