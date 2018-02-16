import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl,Validators } from '@angular/forms/';
import { RecipeServices } from '../../services/recipeServices';
import { Recipe } from '../../models/Recipe';



@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  mode:string;
  options:string[]=['Easy','Medium','Hard'];
  public recipeGroup:FormGroup;
  constructor(private navParams: NavParams
  ,private recipeServices: RecipeServices
  ) {
    
  }
ngOnInit(){
  this.mode=this.navParams.get('mode');
  this.intializeForm();
}
onRecipeSave(f){
  this.recipeServices.save(new Recipe(f.value.title,f.value.description,f.value.difficulty));
  console.log(this.recipeServices.get()[0].title);
}
private intializeForm(){

  this.recipeGroup = new FormGroup({

    'title':new FormControl(null,Validators.required),
    'description':new FormControl(null,Validators.required),
    'difficulty':new FormControl('Medium',Validators.required)
  });
}


}
