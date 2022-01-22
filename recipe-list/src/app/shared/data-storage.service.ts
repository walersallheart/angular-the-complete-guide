import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })

export class DataStorageService {
    url = 'https://ng-course-recipe-book-ea2f0-default-rtdb.firebaseio.com/recipes.json';

    constructor(private http:HttpClient,
                private recipeService:RecipeService,
                private authService:AuthService) {}

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
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http
                    .get<Recipe[]>(
                        this.url,
                        {
                            params:new HttpParams().set('auth', user.token!)
                        }
                    )
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )
    }
}