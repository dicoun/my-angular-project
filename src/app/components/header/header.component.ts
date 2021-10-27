import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
      
@Component({
    selector: 'header-comp',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private router: Router, private auth: AuthService){}
    doLogout(){
        this.auth.clearCredentials();
        this.router.navigate(['login']);
    }
}