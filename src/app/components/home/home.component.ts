import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {CurveModel} from 'src/app/models/curve.model';
import {HttpService} from 'src/app/services/http.service';
import {StorageService} from 'src/app/services/storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
  
@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HttpService]
})
export class HomeComponent implements OnInit, OnDestroy { 
    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>|undefined;  
    constructor(private router: Router, private httpService: HttpService, public storage: StorageService, private auth: AuthService){}
    private ctx: CanvasRenderingContext2D|undefined|null;
    step_l = 0;
    step_u = 0;
    height = 0;
    points_amount = 0;
    curve:CurveModel = new CurveModel(this.step_l, this.step_u, this.height, this.points_amount); 
    subscription: Subscription|undefined;
    data:string = '';
    ngOnInit(): void {
        this.ctx = this.canvas && this.canvas.nativeElement.getContext('2d');
        let canvasWidth:number|undefined = this.canvas && this.canvas.nativeElement.width;
        let canvasHeight:number|undefined = this.canvas && this.canvas.nativeElement.height;
        this.subscription = this.storage.getData().subscribe((data:string) => {
            let sumArr = data && JSON.parse(data);
            //обновление кривой
            if(sumArr){
                this.ctx && canvasWidth && canvasHeight && this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                let arrX = sumArr[0];
                let arrY = sumArr[1];
                let l = sumArr[2];
                let u = sumArr[3];
                let h = sumArr[4];
                this.ctx && this.ctx.beginPath();
                this.ctx && (this.ctx.strokeStyle = 'blue');
                //масштабирование координат кривой в соответствие с размерами канваса(в пикселях)
                this.ctx && canvasWidth && canvasHeight && this.ctx.moveTo(arrX[0]*canvasWidth/(u-l), canvasHeight-arrY[0]*canvasHeight/h);
                for(let i=0; i<arrX.length; i++){
                    this.ctx && canvasWidth && canvasHeight && this.ctx.lineTo(arrX[i]*canvasWidth/(u-l), canvasHeight-arrY[i]*canvasHeight/h);
                };
                this.ctx && this.ctx.stroke();
            }
        });
    }    
    public doGenerate(){
        let newCurve = this.curve;
        this.httpService.postData(newCurve)
                .subscribe(
                    (data: any) => {
                        this.storage.setData(JSON.stringify(data.sumDataArr));
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