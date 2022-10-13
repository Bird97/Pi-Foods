import {
    GET_RECIPES, //Ya :D
    GET_DIETS, //Ya :D
    POST_RECIPE, 
    GET_DETAILS, //Ya :D
    ORDER_RECIPES_BY_NAME, //Ya :D
    ORDER_RECIPES_BY_SCORE, //Ya :D
    FILTER_BY_DIET, //creo que Ya :D
    RESET, //Ya :D
    RESET_DETAIL, //Ya :D
    GET_RECIPES_BY_NAME //Ya :D

} from "./actions"

const initialState = {
  recipes:[],
  recipesAll:[],
  diets: [],
  detail: [],
  errorRender: []
}

export function rootReducer(state=initialState,action){
  
  switch(action.type){
     
    case GET_RECIPES:
      return {
        ...state,
        recipes:action.payload,
        recipesAll: action.payload,
        errorRender: action.payload
      };  

    case GET_DIETS:
      
      return {
        ...state,
        diets:action.payload,
      };

    case POST_RECIPE:
      return { ...state, recipes: state.recipes.concat(action.payload) };

    case GET_DETAILS:
      return { ...state, 
        detail: action.payload 
      };

    case ORDER_RECIPES_BY_NAME:
    let recipesOrderByName =
          action.payload !== "ZtoA"
            ? state.recipes.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : state.recipes.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
        return {
          ...state,
          recipes: recipesOrderByName,
        };
        
    case ORDER_RECIPES_BY_SCORE:
      let recipesOrderByScore =
          action.payload === "minToMax"
            ? state.recipes.sort(function (a, b) {
                if (a.score > b.score) return 1;
                if (b.score > a.score) return -1;
                return 0;
              })
            : state.recipes.sort(function (a, b) {
                if (a.score > b.score) return -1;
                if (b.score > a.score) return 1;
                return 0;
              });
        return {
          ...state,
          recipes: recipesOrderByScore,
        };

    case FILTER_BY_DIET:     
        let recipesByDiet = state.recipesAll.filter(
          recipe=> recipe.diets.includes(action.payload)
        );
        return {
          ...state,
          recipes:recipesByDiet
        };
       
    case GET_RECIPES_BY_NAME:
      let searched=action.payload;
      if(searched!=="No se encontró receta"){
        return{
          ...state,
          recipes:searched,
        }
      }else{
        return {
          ...state,
          recipes:false,
        }
      };

    case RESET:
      return {
        ...state,
        recipes:state.recipesAll,
      };
  
    case RESET_DETAIL:
      return {
        ...state,
        detail:[]
      };
    
    default:
      return state;

  }
}
