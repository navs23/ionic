import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/ingredients";



export class RecipeServices{
   private recipes:Recipe[]=[new Recipe("Curry","vegetable curry","Easy",[new Ingredient("item-1",1)])];
save(recipe:Recipe){
    this.recipes.push(recipe);
}
get(){
    return this.recipes.slice();
}
updateRecipe(index:number,
title:string,
description:string,
difficulty:string,
ingredients:Ingredient[]){
    console.log(difficulty);
this.recipes[index]=new Recipe(title,description,difficulty,ingredients);
}
removeReceipe(index){
this.recipes.slice(index,1);

}

}