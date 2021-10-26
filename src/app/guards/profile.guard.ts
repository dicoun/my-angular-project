import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
 
export class ProfileGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{  
        var login:string, pass:string;
        login = <string>localStorage.getItem('login');
        pass = <string>localStorage.getItem('pass');
        if((login == 'admin') && (pass == '12345')){
            return true;
        }
        return false;
    }
}