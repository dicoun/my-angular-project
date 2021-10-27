import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Router} from '@angular/router'; 
import {Injectable} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private router: Router, private auth: AuthService ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(this.auth.isLoggedIn()){
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}