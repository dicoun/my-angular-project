import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CurveModel} from '../models/curve.model';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    postData(curve: CurveModel){
        //const body = {step_l: curve.step_l, step_u: curve.step_u, height: curve.height, points_amount: curve.points_amount};
        const params = new HttpParams()
        .set('step_l', curve.step_l.toString())
        .set('step_u', curve.step_u.toString())
        .set('height', curve.height.toString())
        .set('points_amount', curve.points_amount.toString());
        return this.http.get('http://localhost:4200/api/curve', {params}); 
    }
}