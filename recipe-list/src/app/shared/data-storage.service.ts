import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })

export class DataStorageService {
    url = 'https://ng-course-recipe-book-ea2f0-default-rtdb.firebaseio.com/recipes.json';

    constructor(private http:HttpClient,
                private recipeService:RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        this.http
            .put(
                this.url,
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes(){
        this.http
            .get<Recipe[]>(this.url)
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }
}