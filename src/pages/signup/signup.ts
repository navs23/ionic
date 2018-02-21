import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService:AuthService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController
  ) {
  }
onSignup(f:NgForm){

  const loading =this.loadingCtrl.create(
    {
      content:'Signing you up, please wait...'

  });
  loading.present();
  var promise = this.authService.signup(f.value.email,f.value.password);

  promise.then((data)=>{
    console.log(data);
    f.reset();
    loading.dismiss();

  })
  .catch((error)=>{
    loading.dismiss();
    const alert = this.alertCtrl.create(
      {
        "title":'Signup failed',
        "message":error.message,
        "buttons":["Ok"]
      });
    
    
    alert.present();
    console.log(error);


  });

}

}
