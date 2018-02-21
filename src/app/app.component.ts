import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthService } from '../services/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage=SigninPage;  
  isAuthenticated=false;
@ViewChild('nav') nav:NavController
  constructor(platform: Platform, 
    private menuCtrl:MenuController,
    private authService:AuthService

  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyCay-SpkUf65S67Atw0qdYRS43gj_pClig",
      authDomain: "navs-recipe.firebaseapp.com"
    }
    );
firebase.auth().onAuthStateChanged((user)=>{
if(user){
this.isAuthenticated=true;
this.rootPage=TabsPage;
}
else{
this.isAuthenticated=false;
this.rootPage=this.signinPage;
}
});

    platform.ready().then(() => {
     
    });
  }

  onLoad(page:any){
  this.nav.setRoot(page);
  this.menuCtrl.close();
  }
  onLogout(){
      this.authService.logout();
      this.nav.setRoot(this.signinPage);
  }
}

