import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Recipe } from "../Recipe/Recipe";
import { getAllRecipes,getDiets} from "../../redux/actions";
import { Loading } from "../Loading/Loading";
import "./Recipes.css";
import { Link } from "react-router-dom";

export function AllRecipes() { 
  let dispatch = useDispatch();

  let allRecipe = useSelector((state) => state.recipes);
  let errorRender = useSelector((state) => state.errorRender);

  const [counterRecipe, setCounterRecipe] = useState(1);
  const [recipePerPage ] = useState(9);
    
  const lastCountry = counterRecipe * recipePerPage; // 1 * 9 = 9
  const firstCountry = lastCountry - recipePerPage; // 9 - 9 = 0
  
  const indexPages = Math.ceil(allRecipe.length / recipePerPage);

  const recipeData = useSelector((state) =>
    state.recipes? state.recipes.slice(firstCountry, lastCountry) : false
  );

  const back = () => {
    if (counterRecipe !== 1) {
      setCounterRecipe(counterRecipe - 1);
    }
  };

  const next = () => {
    if (counterRecipe !== indexPages) {
      setCounterRecipe(counterRecipe + 1);
    }
  };

  const begin = () => {
    setCounterRecipe(1);
  };

  const end = () => {
    setCounterRecipe(indexPages);
  };

  if (counterRecipe > indexPages) {
    back();
  }

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  if (errorRender.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    console.log("Entro al sino");
    return (
      <div>
        <div className="main-cards">
          {recipeData.length === 0 ? (
            console.log(allRecipe),
            <p className="empty">No se encontraron recetas con estas caracteristicas.</p>
          ) : (
            recipeData.map((c, index) => (
              <Link key={index} to={"/recipes/" + c.id} className= "linked">
                <Recipe
                  key={index}
                  name={c.name}
                  image={c.image}
                  diets={c.diets}
                  id={c.id}
                />
              </Link>
            ))
          )}
        </div>

        <div className="pagination">
          <button onClick={begin} className="pagination-button">
            {"<"}
          </button>
          <button onClick={back} className="pagination-button a">
            Previous
          </button>
          <p>
            {counterRecipe} de {indexPages}
          </p>
          <button onClick={next} className="pagination-button p">
            Next
          </button>
          <button onClick={end} className="pagination-button">
            {">"}
          </button>
        </div>
      </div>
    );
  }
}