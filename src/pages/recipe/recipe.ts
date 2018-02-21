import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl,Validators, FormArray, RequiredValidator } from '@angular/forms/';
import { RecipeServices } from '../../services/recipeServices';
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/ingredients';



@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  mode:string;
  recipe:Recipe;
  index:number;
  options:string[]=['Easy','Medium','Hard'];
  public recipeForm:FormGroup;
  constructor(private navParams: NavParams
  ,private recipeServices: RecipeServices
  ,private actionSheet:ActionSheetController
  ,private alertCtrl:AlertController
  ,private toasCtrl:ToastController
  ,private navCtrl:NavController
  ) {
    
  }
ngOnInit(){
  this.mode=this.navParams.get('mode');
  this.recipe=this.navParams.get('recipe');
  this.index=this.navParams.get('index');
  this.intializeForm(this.recipe||new Recipe(null,null,'Medium',[]));
}
createNewIngredientAlert(){
return this.alertCtrl.create({
    title:'Add ingredient',
    inputs:[{

      name:'name',
      placeholder:'Name'
    }],
    buttons:[{
      text:'Cancel',
      role:'cancel'
    }
  ,{
    text:'Add',
    handler:data =>{
      if (data.name.trim()=='' || data.name == null)
      {
        const toast = this.toasCtrl.create({
            message:"Please enter a valid value",
            duration:1*1000,
            position:'bottom'

        })  
        toast.present();
        return;
      }
       (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name,Validators.required));
       const toast = this.toasCtrl.create({
        message:"Item added",
        duration:1*1000,
        position:'bottom'

    })  
    toast.present();
    }
  }
  ]
  })
}
onRecipeSave(f){
  let ingredients = [];
  if (f.value.ingredients.length>0)
  {
    ingredients = f.value.ingredients.map(name=>{
      return {name:name,amount:1};

    });
  }

  console.log("difficulty is %s",f.value.difficulty);
  if (this.index>=0 && this.mode ==="Edit"){
    // update
    console.log('save on edit')
    this.recipeServices.updateRecipe(this.index,f.value.title,f.value.description,f.value.difficulty,ingredients);
  }
  else
  {
    // add new recipe
    console.log('save on new')
    this.recipeServices.save(new Recipe(f.value.title,f.value.description,f.value.difficulty,ingredients));
  }
  this.recipeForm.reset();
  this.navCtrl.popToRoot();
  console.log(this.recipeServices.get());
}
onManageIngredients(){
  const actionSheet = this.actionSheet.create({
    title:"What do you want to do?",
    buttons:[

      {
          text:"Add ingredients",
          handler:()=>{
              this.createNewIngredientAlert().present();

          }

      },
      {
        text:"Remove ingredients",
  
        handler:() =>{
          const fArray = (<FormArray>this.recipeForm.get('ingredients'));
          const len = fArray.length;
          for(let i=0;i<len;i++){
            fArray.removeAt(i);
          }

          const toast = this.toasCtrl.create({
            message:"Ingredient items removed",
            duration:1*1000,
            position:'bottom'

        })  
        toast.present();

        }
            
          
    },
    {
      text:"Cancel",
      role:"cancel"

  }
    ]
  });

  actionSheet.present();
}
private intializeForm(recipe:Recipe){

  this.recipeForm = new FormGroup({

    'title':new FormControl(recipe.title,Validators.required),
    'description':new FormControl(recipe.description,Validators.required),
    'difficulty':new FormControl(recipe.difficulty,Validators.required),
    'ingredients':new FormArray([])
  });
}


}
