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
            return of(new HttpResponse({ status: 200, body: {} }));
      }
      return next.handle(req)
  }
}