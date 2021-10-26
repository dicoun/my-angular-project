import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {CurveModel} from 'src/app/models/curve.model';
import {HttpService} from 'src/app/services/http.service';
import {StorageService} from 'src/app/services/storage.service';
import {Subscription} from 'rxjs';
  
@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HttpService]
})
export class HomeComponent implements OnInit, OnDestroy { 
    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>|undefined;  
    constructor(private router: Router, private httpService: HttpService, public storage: StorageService){}
    private ctx: CanvasRenderingContext2D|undefined|null;
    step_l = 0;
    step_u = 0;
    height = 0;
    points_amount = 0;
   // curve:Curve|undefined;   
    curve:CurveModel = new CurveModel(this.step_l, this.step_u, this.height, this.points_amount); 
    subscription: Subscription|undefined;
    data:string = '';
    ngOnInit(): void {
        this.ctx = this.canvas && this.canvas.nativeElement.getContext('2d');
        this.subscription = this.storage.getData().subscribe((data:string) => this.data = data);
      }    
    public doLogout(){
        localStorage.clear();
        this.router.navigate(['login']);
    }
    public doGenerate(){
       // this.curve = new Curve(this.step_l, this.step_u, this.height, this.points_amount);     
        let newCurve = this.curve;
        this.httpService.postData(newCurve)
                .subscribe(
                    (data: any) => {
                        let sumArr = JSON.parse(this.data);
                        let arrX = sumArr[0];
                        let arrY = sumArr[1];
                        let l = sumArr[2];
                        let u = sumArr[3];
                        let h = sumArr[4];
                        this.ctx && (this.ctx.canvas.width = u-l);
                        this.ctx && (this.ctx.canvas.height = h);
                        this.ctx && this.ctx.beginPath();
                        this.ctx && (this.ctx.strokeStyle = 'blue');
                        //направить ось Y вверх, по умолчанию направлена вниз
                        //this.ctx && (this.ctx.setTransform(1,0,0,-1,0,h));
                        this.ctx && this.ctx.moveTo(arrX[0], arrY[0]);
                        for(let i=0; i<arrX.length; i++){
                            this.ctx && this.ctx.lineTo(arrX[i], arrY[i]);
                        };
                        this.ctx && this.ctx.stroke();
                    }
                );
    }
    ngOnDestroy(): void {
        if (this.subscription !== undefined) {
          this.subscription.unsubscribe();
          this.subscription = undefined;
        }
    }
}