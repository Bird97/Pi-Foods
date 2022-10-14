 import React from "react";
import { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import {postRecipe, getDiets, getAllRecipes,} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css";
import imageCreate from "../../assets/top-view-delicious-mexican-food-ready-to-be-served.jpg"

//Validacion del formulario:
import { validate } from "./validateForm";

export function Create() {
  const dispatch = useDispatch();
  const navigate = useRouteMatch();
  const stateDiets = useSelector((state) => state.diets);
  const totalRecipes = useSelector((state) => state.recipesAll);

  const [errors, setErrorForm] = useState({});

  const [input, setInput] = useState({
    name: ``,
    summary: ``,
    score: ``,
    steps: ``,
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getAllRecipes());
  }, [dispatch]);

  function handleInputChange(e) { 
    setInput({ 
      ...input, 
      [e.target.name]: e.target.value 
    });
    setErrorForm(validate({ 
        ...input, 
        [e.target.name]: e.target.value }));
  };

  function handleDeleteDiet(el) { 
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== el),
    });
  };

  function handleDietChange(e) { 
    if(!input.diets.includes(e.target.value)){
      setInput({ 
        ...input, 
        diets: [...input.diets, e.target.value] 
      });
    }
  };

  function handleSubmit(e) {    
    e.preventDefault();
    try {
      let findName = totalRecipes.filter((e) => e.name.toLowerCase() === input.name.toLowerCase()
      )
      if (!findName) {
        return alert("Ya existe una receta con este nombre. ¡Cambialo!");
      } else if (Object.keys(errors).length) {
        return alert(Object.values(errors));
      } else {
        dispatch(postRecipe(input));
        setInput({
          name: ``,
          summary: ``,
          score: ``,
          steps: ``,
          diets: [],
        });
        return (
          alert(`La receta fue creada con éxito.`), navigate(`/recipes/`)
        ) 
      }   
    } catch (error) {
      console.log(error);
      // return alert(
      //   "Algo falló al crear la nueva Receta. ¡Intentalo de nuevo!"
      // );
    }
  };

  return (
    <div className="create_container">
      <img className="imgCreate" src={imageCreate} alt="" />
      <h1 className="title">¡create your Recipe!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="info-form">

          <div>
            <label for="name">Name:</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              className="input"
              placeholder="insert recipe name..."
            />
            {errors.name && (
              <div className="errors">
                <div id="name">{errors.name}</div>
              </div>
            )}
          </div>

          <div>
            <label>Summary:</label>
            <input
              onChange={handleInputChange}
              value={input.summary}
              name="summary"
              type="text"
              className="input"
              placeholder="insert summary recipe..."
            />
            {errors.summary && (
              <div className="errors">
                <div>{errors.summary}</div>
              </div>
            )}
          </div>




          <div>
            <label>Score:</label>
            <input
              onChange={handleInputChange}
              value={input.score}
              name="score"
              type="number"
              className="input"
              min="1"
              max="100"
              placeholder="Insert recipe health score..."
            />
            {errors.score && (
              <div className="errors">
                <div>{errors.score}</div>
              </div>
            )}
          </div>

          <div>
            <label>Steps:</label>
            <input
              onChange={handleInputChange}
              value={input.steps}
              name="steps"
              type="text"
              className="input"
              placeholder="insert recipe steps..."
            />
            {errors.steps && (
              <div className="errors">
                <div>{errors.steps}</div>
              </div>
            )}
          </div>
 

          <div>
            <label>Diets:</label>
            {input.diets.length === 0 ? (<p className="selectDiet">Select at lest one diet!</p>
            ):null} 
              <p className="diets-s">
              <select 
                value={input.diets}
                name="diets"
                className="select"
                onChange={handleDietChange}
                >
                {
                stateDiets.map((e) => (                           
                  <option  value={e.name}>{e.name}</option>
                ))}
              </select>
            </p> 
            <h5 className="deleteDiet">
              {input.diets?.map((el) => (
                <p className="nameDiet">
                  {el}
                  <button className="link-route" onClick={(e) => handleDeleteDiet(el)}>delete</button>
                </p>
              ))}
            </h5>
          </div>
          
        </div>
        <div className="BTNS">
          <button className="link-route" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              
              Create
          </button>
          <Link className="link-route" to="/recipes/" style={{ textDecoration: "none" }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Home
          </Link>
        </div>
      </form>   
    </div>
  );
}

    