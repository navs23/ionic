import { Component } from '@angular/core';
import { ShopingListPage } from '../shoping-list/shoping-list';
import { RecipesPage } from '../recipes/recipes';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
slPage=ShopingListPage;
receipesPage=RecipesPage
 

}
