import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/Recipe';
import { RecipeServices } from '../../services/recipeServices';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {
private recipes:Recipe[];
  constructor(private navCtrl: NavController, private navParams: NavParams,private recipeServices:RecipeServices) {

  }
onNewRecipe(){
  this.navCtrl.push(RecipePage,{mode:'New'});
 
}
onEditRecipe(index:number){
  const recipe=this.recipes[index];
  console.log("edit:%s",recipe.title);
  this.navCtrl.push(RecipePage,{mode:'Edit',index:index,recipe:recipe});
} 
ngOnInit(){
  this.recipes=this.recipeServices.get();
}
ionViewWillEnter(){
  this.recipes=this.recipeServices.get();
  console.log('here');
}
onCheckItem(index:number){

}
}
