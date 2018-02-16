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
  this.navCtrl.push(RecipePage,{mode:'new'});
}
onEditRecipe(recipe:string){
  this.navCtrl.push(RecipePage,{mode:'edit'});
} 
ngOnInit(){
  this.recipes=this.recipeServices.get();
}
}
