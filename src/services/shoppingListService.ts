import { Ingredient } from "../models/ingredients";

import { Injectable } from "@angular/core";


import { AuthService } from "./auth";
import 'rxjs/rx';
import { HttpClient } from "@angular/common/http";
@Injectable()
export class ShoppingListService{
    private ingredients:any=[];
    
    constructor(private http:HttpClient,private authService:AuthService){

    }
pr
    addItem(name:string,amount:number){
        
        this.ingredients.push(new Ingredient(name,amount));
    }
    addItems(items:Ingredient[]){

        this.ingredients.push(...items);
    }
    getItems(){
        if(this.ingredients)
            return this.ingredients.slice();
        else
        return this.ingredients || [];
    }
    removeItem(index:number){
        if(this.ingredients){
            this.ingredients.splice(index,1);
        }
    }
    storeList(token:string){
        const userId = this.authService.getActiveUser().uid

        return this.http.put('https://navs-recipe.firebaseio.com/'+ userId + '/shopping-list.json?auth=' + token,this.ingredients)
        .map((respose:Response)=>{
            return respose;
        });


    }
    fetchList(token:string){
        const userId = this.authService.getActiveUser().uid

        return this.http.get('https://navs-recipe.firebaseio.com/'+ userId + '/shopping-list.json?auth=' + token)
        .map((response:Response)=>{
            console.log("list is");
            console.log(response);
            return response;
        })
        .do(data=>{
        //  console.log("%s",data);
         this.ingredients=(data) || [];
        });


    }
}