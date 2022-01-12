import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

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

    getRecipes() {
        //we use slice to return a copy of the array instead of a reference, since its supposed to be private
        return this.recipes.slice();
    }
}