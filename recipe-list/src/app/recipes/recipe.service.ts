import { Recipe } from "./recipe.model";

export class RecipeService{
    private recipes:Recipe[] = [
        new Recipe('A Test Recipe!','This is simply a test','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'),
        new Recipe('Another Test Recipe','This is simply a test','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'),
        new Recipe('Yet Another Test Recipe','This is simply a test','https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg')
    ];

    getRecipes() {
        //we use slice to return a copy of the array instead of a reference, since its supposed to be private
        return this.recipes.slice();
    }
}