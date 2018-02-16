import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shoppingListService';
import { Ingredient } from '../../models/ingredients';

@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {
  items: Ingredient[];
  
  constructor(private shoppingListService:ShoppingListService){}
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
}
