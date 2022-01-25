import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
    shoppingList:State;
}

export interface State {
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number;
}

const initialState:State = {
    ingredients : [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient:null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state:State = initialState, action:ShoppingListActions.ShoppingListActions){
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            }
            break;
        case ShoppingListActions.ADD_INGREDIENTS :
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload].flat(Infinity)
                }
                break;
        case ShoppingListActions.UPDATE_INGREDIENT :
                const index = action.payload['index'];
                const ingredient = state.ingredients[index];
                const updateIngredient = {
                    ...ingredient,
                    ...action.payload['ingredient']
                };

                const updateIngredients = [...state.ingredients];
                updateIngredients[index] =  updateIngredient;

                return {
                    ...state,
                    ingredients: updateIngredients
                }
                break;
        case ShoppingListActions.DELETE_INGREDIENT :
                return {
                    ...state,
                    ingredients: state.ingredients.filter((ingredient, index) => {
                        return index !== action.payload;
                    })
                }
                break;
        default:
            return state;
    }
}