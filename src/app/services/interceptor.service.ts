import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {StorageService} from './storage.service';
   
@Injectable()
export class ReqInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService) {}
    intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      let h = Number(req.params.get('height'));
      let l = Number(req.params.get('step_l'));
      let u = Number(req.params.get('step_u'));
      let k = Number(req.params.get('points_amount'));
      let randomNumber=(min:number, max:number)=>{
        return Math.random() * (max - min) + min;
      }
      let a = randomNumber(0,h);
      let b = randomNumber(l,u);
      let c = (l-u)/100;
      let arrX = [];
      let arrY = [];
      let delX = (u-l)/(k-1);
      let currX = 0;
      for(let i=1; i<=k; i++){
        let x:number, y:number;
        x = currX;
        y = a*Math.exp((Math.pow((x-b), 2))/2*Math.pow(c,2));
        arrX.push(x);
        if((y == Infinity) || (y > h)){
          arrY.push(h);
        }
        else{
          arrY.push(y);
        }
        currX += delX;
      }
      let sumArr = [arrX, arrY, l, u, h, a, b, c]; 
      if(req.method === "GET" && req.url === "http://localhost:4200/api/curve") {
            this.storage.setData(JSON.stringify(sumArr));
            return of(new HttpResponse({ status: 200, body: JSON.stringify(sumArr) }));
      }
      return next.handle(req)
  }
}