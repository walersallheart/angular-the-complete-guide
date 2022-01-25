import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

//Prefixing your event type names is encouraged to ensure uniqueness
//Action dispatches always hit ALL reducers, not jsut the one you're looking for
export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload:Ingredient){}
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
    public payload:any = null;
}

export class StartEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: number){}
}

export class StopEdit implements Action {
    readonly type: string = STOP_EDIT;
    public payload:any = null;
}

export type ShoppingListActions =
    AddIngredient |
    AddIngredients |
    UpdateIngredient |
    DeleteIngredient |
    StartEdit |
    StopEdit;