import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from  '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
@Injectable()

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    private recipes:Recipe[] = [];

    constructor(public store:Store<fromShoppingList.AppState>) {}

    setRecipes(recipes:Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        //we use slice to return a copy of the array instead of a reference, since its supposed to be private
        return this.recipes.slice();
    }

    getRecipe(index:number):Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]) {
        //this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number)  {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}