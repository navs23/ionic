import { Recipe } from "../models/Recipe";



export class RecipeServices{
   private recipes:Recipe[]=[new Recipe("Curry","vegetable curry","Easy")];
save(recipe:Recipe){
    this.recipes.push(recipe);
}
get(){
    return this.recipes.slice();
}

}