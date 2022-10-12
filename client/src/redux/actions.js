import axios from "axios"

// -------------------> ACTIONS <-------------------

export const GET_RECIPES = "GET_RECIPES"; 
export const GET_DIETS ="GET_DIETS"; 
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME"; 
export const POST_RECIPE ="POST_RECIPE";
export const GET_DETAILS ="GET_DETAILS"; 
export const ORDER_RECIPES_BY_NAME ="ORDER_RECIPES_BY_NAME"; 
export const ORDER_RECIPES_BY_SCORE ="ORDER_RECIPES_BY_SCORE"; 
export const FILTER_BY_DIET ="FILTER_BY_DIET"; 
export const RESET = "RESET"; 
export const RESET_DETAIL = "RESET_DETAIL";

//-------------------> RUTES <-------------------
export const URL_RECIPES = "http://localhost:3001/recipes"
export const URL_POST_RECIPE = "http://localhost:3001/recipes/create"
export const URL_DIETS = "http://localhost:3001/diets"

export function getAllRecipes() {
  return async function (dispatch) {
    try {
      let jsonRecipes = await axios.get(URL_RECIPES);
      return dispatch({
        type: GET_RECIPES,
        payload: jsonRecipes.data,       
      });
    } catch (error) {
      console.log(error.message);
      return alert(
        "Ay wey... :( Hubo un error al cargar la informacion. Intenta en unos minutos"
      );
    }
  };
}

export function getDiets(){
  return async function (dispatch){
    try{
      let diets= await axios.get(URL_DIETS);
      return dispatch({
        type: GET_DIETS,
        payload: diets.data,       
      });      
    }catch(e){
      console.log(e.message);
      return alert(
        ":( Hubo un error al cargar la informacion. Intenta en unos minutos"
      );
    }
  }
}

export function getNameRecipe(name) {
  return async function (dispatch) {
    try {
      if (name.search(/^[a-zA-Zñáéíóúü]*$/)) {
        return alert("El nombre a buscar solo debe contener letras.");
      }
      let jsonRecipes = await axios.get(URL_RECIPES+"?name="+name);
      
      if (jsonRecipes.data === "No se encontró receta") { 
        alert(`No se encontró receta con el nombre: ${name}`);
      }
      return dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: jsonRecipes.data,
      });
    } catch (e) {
      return alert(`No se encontró Receta con el nombre: ${name}`);
    }
  };
}

export function getDetails(id){
  return async function (dispatch) {
    try {
      let jsonRecipeID = await axios.get(
        `http://localhost:3001/recipes/${id}`
      );

      return dispatch({
        type: GET_DETAILS,
        payload: jsonRecipeID.data,
      });
    } catch (error) {
      return alert(`No encontramos Receta el ID ${id}.`);
    }
  };
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

// // -------------------> ORDENAMIENTOS <-------------------

export function orderByScore(payload) {
  return {
    type: ORDER_RECIPES_BY_SCORE,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_RECIPES_BY_NAME,
    payload,
  };
}

// // -------------------> FILTRO <-------------------

export function  filterByDiet(payload){
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}