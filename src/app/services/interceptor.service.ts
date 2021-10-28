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
      if(req.method === "GET" && req.url === "http://localhost:4200/api/curve") {
        //рассчет координат точек кривой, отправка координат точек в ответе
        let randomNumber=(min:number, max:number)=>{
          return Math.random() * (max - min) + min;
        }
        let a = randomNumber(0,Number(req.params.get('height')));
        let b = randomNumber(Number(req.params.get('step_l')),Number(req.params.get('step_u')));
        let c = (Number(req.params.get('step_l'))-Number(req.params.get('step_u')))/100;
        let arrXX = Array(0);
        let arrYY = [];
        let delX = (Number(req.params.get('step_u'))-Number(req.params.get('step_l')))/(Number(req.params.get('points_amount'))-1);
        let currX = 0;
        for(let i=1; i<=Number(req.params.get('points_amount')); i++){
            let x:number, y:number;
            x = currX;
            y = a*Math.exp((-1)*(Math.pow((x-b), 2))/(2*Math.pow(c,2)));
            arrXX.push(x);
            if((y == Infinity) || (y > Number(req.params.get('height')))){
                arrYY.push(Number(req.params.get('height')));
            }
            else{
                arrYY.push(y);
            }
            currX += delX;
        }
        let sumDataArr = [arrXX, arrYY, Number(req.params.get('step_l')), Number(req.params.get('step_u')), Number(req.params.get('height')), a, b, c]; 
            return of(new HttpResponse({ status: 200, body: {sumDataArr} }));
      }
      return next.handle(req)
  }
}