import { NavBar } from "../NavBar/NavBar";
import { AllRecipes } from "../Recipes/Recipes";
import { Filter } from "../Filters/Filters";
import imgLanding from "../../assets/delicious-food-frame-top-view.jpg";
import "./Home.css";

export function Home() {
  return (
    <div>
      <div className="home-container">
        <img className="img" src={imgLanding} alt="" />    
        <NavBar/>         
      </div>
     <Filter />
    <AllRecipes/>     
    </div>
  );
}
