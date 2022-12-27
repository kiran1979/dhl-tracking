import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dhl-tracking';
  provider:any = FormGroup;
  errorMessage:any;
  responce:any;
  location:any;
  message:boolean =false;
  providerNameValue:any;
  id:any;
  // providerValue:boolean=false
  constructor(private formBuilder: FormBuilder, private auth:AuthServiceService){

  }
  ngOnInit(): void {
    this.provider = this.formBuilder.group({
      providerName:['', Validators.required],
      trakerNumber:['', Validators.required]
    });
   }
   providername(e:any){
    console.log(e.target.value);
    this.providerNameValue=e.target.value
    this.provider.value.providerName = e.target.value;
    if(this.providerNameValue === 'DHL'){
      this.message=false;
      ///this.errorMessage='Tracking for this provider is currenntly unavailable';
    }else{
      this.message=true;
      this.errorMessage='Tracking for this provider is currenntly unavailable';
    }

   }
   submit(){
    this.auth.dhlAPI(this.provider.value.trakerNumber).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.shipments.length == 1){
          this.responce=res.shipments[0].status;
          this.id=res.shipments[0].id
        this.location=res.shipments[0].status.location.address;
        this.message=false
        console.log(this.responce);
        }
        
      },(error:any)=>{
        console.log(error);
        this.message=true
        this.errorMessage = error.error.detail;
      }
    );
  }
}
