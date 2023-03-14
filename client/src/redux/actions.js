import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAN_RECIPES = "CLEAN_RECIPES";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_SEARCHED_RECIPES = "GET_SEARCHED_RECIPES";
export const CLEAN_SEARCHED_RECIPES = "CLEAN_SEARCHED_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_API_OR_DATABASE = "FILTER_BY_API_OR_DATABASE";


export const allRecipes = () => {
    return async function (dispatch){
        const info = await axios.get('http://localhost:3001/recipes');
        const recipes = info.data;
        dispatch({
            type: GET_RECIPES,
            payload: recipes
        })
    }
};

export const cleanAllRecipes = () => {
    return {type: CLEAN_RECIPES}
};

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        const info = await axios.get(`http://localhost:3001/recipes/${id}`);
        const recipeDetail = info.data;
        dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipeDetail
        })
    }
};

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
};

export const searchedRecipes = (recipe) => {
    return async function (dispatch) {
        const info = await axios.get(`http://localhost:3001/recipes?name=${recipe}`);
        const recipes = info.data;
        dispatch({
            type: GET_SEARCHED_RECIPES,
            payload: recipes
        })
    }
};

export const cleanSearchedRecipes = () => {
    return {type: CLEAN_SEARCHED_RECIPES}
};

export const getDiets = () => {
    return async function(dispatch){
        const info = await axios.get('http://localhost:3001/diets');
        const diets = info.data;
        dispatch({
            type: GET_DIETS,
            payload: diets
        });
    };
};

export const orderRecipes = (order) => {
    return function (dispatch, getState){
        let recipes = [...getState().recipes]
        const recipesCopy = [...getState().recipesCopy]
        

        switch (order) {
            case 'healthScoreAsc':
                recipes.sort((a, b) => a.healthScore - b.healthScore);
                break;
            case 'healthScoreDesc':
                recipes.sort((a, b) => b.healthScore - a.healthScore);
                break;
            case 'nameAsc':
                recipes.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDesc':
                recipes.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'sinOrden':
                recipes = recipesCopy;
                break;
            default:
                break;
        };

    dispatch({
        type: ORDER_RECIPES,
        payload: recipes,
    });
    }
};

export const filterRecipesByDiet = (diet) => {
    return function(dispatch, getState){
        let recipes = [...getState().recipes];
        const recipesCopy = [...getState().recipesCopy]

        if(diet) {
            recipes = recipesCopy;
            var response = recipes.filter((recipe) => recipe.dietas.includes(diet))
            console.log('se consologuea este primero o la entrada al reducer?');
        } else{
            response = recipesCopy;
        };
            
        dispatch({
            type: FILTER_BY_DIETS,
            payload: response,
        });
    };
};

export const filterByApiOrDatabase = (filt) => {
    return function (dispatch, getState) {
        let recipes = [...getState().recipes];
        const recipesCopy = [...getState().recipesCopy]

        if(filt === 'apiRecipes'){
            recipes = recipesCopy;
            const apiRecipes = recipes.filter((recipe) => { 
                return typeof(recipe.id) === 'number'
            });

            dispatch({
                type: FILTER_BY_API_OR_DATABASE,
                payload: apiRecipes,
            });
        } else if(filt === 'databaseRecipes') {
            recipes = recipesCopy;
            const databaseRecipes = recipes.filter((recipe) => { 
                return typeof(recipe.id) === 'string'
            });

            dispatch({
                type: FILTER_BY_API_OR_DATABASE,
                payload: databaseRecipes,
            });
        }else{
            dispatch({
                type: FILTER_BY_API_OR_DATABASE,
                payload: recipesCopy,
            });
        };
    };
};

