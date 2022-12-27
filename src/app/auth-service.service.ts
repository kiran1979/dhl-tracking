import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  message: any;
  private messageSource = new BehaviorSubject<string>('default');
  currentMessage = this.messageSource.asObservable();

  changemessage(message: string){
    this.messageSource.next(message);
    // console.log(message);
  }

  dhlAPI(num:any){
    console.log(num);
    const headers = new HttpHeaders({'DHL-API-Key':'PUXZFuAuYZ7U1dsqo0dkBmuV9DAxWfDK'})
    return this.http.get<any>(`https://api-eu.dhl.com/track/shipments?trackingNumber=${num}`,{headers:headers}).pipe(
      map(res=>{
      return res;
    }))
  }
  
}
