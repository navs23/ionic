import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shoppingListService';
import { Ingredient } from '../../models/ingredients';
import { PopoverController } from 'ionic-angular';
import { SLOptionsPage } from './sl-options/st-options';
import { AuthService } from '../../services/auth';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {
  items: Ingredient[];
  
  constructor(private shoppingListService:ShoppingListService
  ,private popoverCtrl:PopoverController,
  private authService:AuthService
  ){}
  ionViewWillEnter(){
    console.log(this.shoppingListService.getItems());
    this.loadItems();
}

onAddItem(f){
  
  this.shoppingListService.addItem(f.value.ingredientName,f.value.amount);
  this.loadItems();
  f.reset();

}
onCheckItem(itemIndex:number){
 
this.shoppingListService.removeItem(itemIndex) 
this.loadItems();

}

loadItems(){
  this.items=this.shoppingListService.getItems();
}
onShowOptions(event){
  var popover=this.popoverCtrl.create(SLOptionsPage);
  popover.present({ev:event});
  popover.onDidDismiss((data)=>{
    if(!data) return;
    if (data.action=='load'){
      var promise= this.authService.getActiveUser().getIdToken();
      promise.then((token:string)=>{

        this.shoppingListService.fetchList(token).subscribe((list)=>{
            if (list){
              this.loadItems();
              console.log('success');
            }
            else{
              this.items=[];
            }
          
          

        },error=>{
            console.log(error);

        });
      })
      .catch((err)=>{console.log(err)})
    }
    else {
        var promise= this.authService.getActiveUser().getIdToken();
        promise.then((token:string)=>{

          this.shoppingListService.storeList(token).subscribe(()=>{
              console.log('success');

          },error=>{
              console.log(error);

          });
        })
        .catch((err)=>{console.log(err)})
    }
  });
}
}
