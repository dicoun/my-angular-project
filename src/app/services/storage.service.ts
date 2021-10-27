import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
    
  private dataSubject: BehaviorSubject<string> = new BehaviorSubject('');
  data$: Observable<string> = this.dataSubject.asObservable();

  setData(newValue: string) {
    this.dataSubject.next(newValue);
  }
  getData(){
    return this.data$;
  }
}