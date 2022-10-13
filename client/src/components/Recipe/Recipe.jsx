import React from "react";
import "./Recipe.css";

export function Recipe({ id,image, name, diets,maxReadyTime}) {
    
  let dietas=""; //inicializo variable;
  
  diets.forEach(element => {  // recorrer "dietas" 
    dietas=dietas+element+", "; //agrega el nombre de la dieta +", " al string 
  });

  dietas=dietas.substring(0, dietas.length - 2)+".";  //"elimino el ultimo ", " y le agrego un punto al final;

  return (
    <div className="card-recipe-container" key={id}>
      <div>
        <img
          className="recipe-img"
          src={image}
          alt="recipe-img"
        />
      </div>
      <h3 className="recipe-name">{name}</h3>
      <div>
        maxReadyTime:
        <h3 className="diets">{           
          maxReadyTime
        }</h3>
        Diets type:
        <h4 className="diets">{           
          dietas
        }</h4>
      </div>
    </div>
  );
}