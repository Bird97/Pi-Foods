
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { NavBarDetails } from "../NavBar/NavBarDetails";
import  imgDetails from "../../assets/delicious-food-frame-top-view.jpg";
import {getDetails} from "../../redux/actions";

import "./Details.css";

export function Details() {

    const dispatch = useDispatch();
    const params = useParams(); //Para obtener el ID por Params
    const oneRecipe = useSelector((state) => state.detail);
  

    let diets="";
    let types="";
    
    if(oneRecipe.diets){
        oneRecipe.diets.forEach(element => {  
            diets=diets+element+", ";  
        });
        diets=diets.substring(0, diets.length - 2)+"."; 
    }

    if(oneRecipe.dishTypes){
        oneRecipe.dishTypes.forEach(element => {  
            types=types+element+", ";  
        });
        types=types.substring(0, types.length - 2)+"."; 
    }

    useEffect(() => {
      dispatch(getDetails(params.id));
    }, [dispatch, params.id]);

    //to read html from string
    let completedText = '';

    async function texto(str,id){
      let text= await str;
      completedText = `<h3>${text}</h3>`
      document.querySelector(id).innerHTML = completedText
    }

    console.log(oneRecipe.summary);
    //console.log(oneRecipe.steps);

    texto(oneRecipe.summary,'#divSum');
    texto(oneRecipe.steps,'#ache4');


    
  
    if (!oneRecipe.name) {
      return (
        <div >
          <NavBarDetails/>
          <div>
            <Loading />
          </div>
        </div>
      );
    } else if (oneRecipe.length !== 0) {
      return (
        <div>
          <NavBarDetails/>         
            <img className="imgDetais" src={imgDetails} alt="" />   

          <div className="background">
            <div className="cardsDetails">
              <div>
                <h3 className="Name">
                   {oneRecipe.name}
                </h3>
                <img
                  src={oneRecipe.image}
                  alt={oneRecipe.name}
                  className="recipeImage"
                />
              </div>
              <div className="description">
                <div>
                    <h2>Dish Types</h2>
                    <h3>{`${types}`}</h3>
                </div>
                <div>
                    <h2>Diets</h2>
                    <h3>{` ${diets}`}</h3>
                </div>
                <div>
                    <h2>Healt Score</h2>
                    <h3>{`${oneRecipe.score}`}</h3>
                </div>
                <h2>Summary</h2>
                <div id="divSum"></div>
                <div >
                    <h2>Steps</h2>
                    <div id="ache4"></div>
                </div>
              </div>

            </div>
            <div className="buttonss">
              <button className="button-home">
                <Link to="/recipes/" className="linked">
                  Back to home
                </Link>
              </button>             
            </div>
          </div>
        </div>
      );
    } else if (!oneRecipe.length) {
      return (
        <div>
          <NavBarDetails />
          <div>
            si tuviera una errorPage iría justo aquí
          </div>
        </div>
      );
    }
  }