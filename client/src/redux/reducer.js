import { CLEAN_DETAIL, CLEAN_RECIPES, CLEAN_SEARCHED_RECIPES, 
         FILTER_BY_API_OR_DATABASE, 
         FILTER_BY_DIETS, GET_DIETS, GET_RECIPES, GET_RECIPE_DETAIL, 
         GET_SEARCHED_RECIPES, ORDER_RECIPES } from "./actions";

const initialState = {
    recipes: [],
    recipesCopy: [],
    recipeDetail: {},
    diets: [],
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload,
            };
        case CLEAN_RECIPES:
            return{
                ...state,
                recipes: [],
            };
        case GET_RECIPE_DETAIL:
            return{
                ...state,
                recipeDetail: action.payload,
            };
        case CLEAN_DETAIL:
            return{
                ...state,
                recipeDetail: {},
            };
        case GET_SEARCHED_RECIPES:
            return{
                ...state,
                recipes: action.payload,
            };
        case CLEAN_SEARCHED_RECIPES:
            return{
                ...state,
                recipes: [],
            };
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload,
            };
        case ORDER_RECIPES:
            return{
                ...state,
                recipes: action.payload,
            };
        case FILTER_BY_DIETS:
            return{
            ...state,
            recipes: action.payload,
            };
        case FILTER_BY_API_OR_DATABASE:
            return{
                ...state,
                recipes: action.payload,
            };
        default:
           return {...state}
    }
}