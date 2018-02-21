import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService:AuthService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController
  ) {
  }
  onSignin(f:NgForm){

  const loading =this.loadingCtrl.create(
    {
      content:'Signing you up, please wait...'

  });
  loading.present();

  var promise = this.authService.signin(f.value.email,f.value.password);

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