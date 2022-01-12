import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes:Recipe[] = [
        new Recipe(
            'A Test Recipe!',
            'This is simply a test','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',20)
            ]
        ),
        new Recipe(
            'Another Test Recipe',
            'This is simply a test','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
            [
                new Ingredient('Buns',2),
                new Ingredient('Meat',1)
            ]
        )
    ];

    constructor(private slService:ShoppingListService) {}

    getRecipes() {
        //we use slice to return a copy of the array instead of a reference, since its supposed to be private
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}