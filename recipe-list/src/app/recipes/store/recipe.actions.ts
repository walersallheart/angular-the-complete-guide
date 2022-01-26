import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

//Prefixing your event type names is encouraged to ensure uniqueness
//Action dispatches always hit ALL reducers, not jsut the one you're looking for
export const SET_RECIPES = '[Recipe] Set Recipes';

export class SetRecipes implements Action {
    readonly type: string = SET_RECIPES;
    constructor(public payload:Recipe[]){}
}

export type RecipesActions = SetRecipes;