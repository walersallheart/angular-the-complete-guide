import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    private recipes:Recipe[] = [];

    constructor(private slService:ShoppingListService) {}

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
        this.slService.addIngredients(ingredients);
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