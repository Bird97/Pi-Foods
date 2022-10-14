import { useDispatch //,useSelector
} from "react-redux";

import {
  orderByName,
  orderByScore,
  filterByDiet,
} from "../../redux/actions";
import "./Filters.css";

export function Filter() {
  const dispatch = useDispatch();
  //const Diets = useSelector((state) => state.diets);
  //const totalActivities = useSelector((state) => state.activities);

  //Funcion de reseteo a los filtros/orden:
  function handleReset() {
    window.location.reload();
  }
  //Filtrado por dieta
  function handleFilterDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  function handleFilterName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
  }

 //(e)={handleFilterDiet(e)}
  //let completedText=``;
  // async function Dietas(diets){
  //   let dietas= await diets;  
  //   completedText = `<select class="select" defaultValue="diets" onChange={${function(e){return handleFilterDiet(e)}}}}>
  //   <option class="options" value="diets" disabled>diets</option>${dietas.map(d=>{return `<option class="options" value=${d.name}>${d.name}</option>`})}</select>`
  //   document.querySelector(`#filtro`).innerHTML = completedText
  // }
  // Dietas(Diets);


  return (
    
      <aside className="aside-container">
        <div className= "ordenado">
          <label className="label">Sort by: </label>
          <select
            className="select"
            defaultValue="name"
            onChange={(e) => handleFilterName(e)}
          >
            <option className="options" value="name" disabled>
              Name
            </option>
            <option className="options" value="AtoZ">
              A - Z
            </option>
            <option className="options" value="ZtoA">
              Z - A
            </option>
          </select>

          <select
            className="select"
            defaultValue="score"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option className="options" value="score" disabled>
              Score
            </option>
            <option className="options" value="minToMax">
              Min to Max
            </option>
            <option className="options" value="maxToMin">
              Max to Min
            </option>
          </select>
        </div>

        <div className="filtrado">
          <label className="label">Filter by: </label>
          <select class="select" defaultValue="diets" onChange={e=> handleFilterDiet(e)}>  
                     <option className="options" value="diets" disabled>diets</option>
                     <option className="options" value="gluten free">Gluten Free</option>
                     <option className="options" value="ketogenic">Keto</option>
                     <option className="options" value="vegetarian">Vegetarian</option>
                     <option className="options" value="lacto vegetarian">Lacto-Vegetarian</option>
                     <option className="options" value="ovo vegetarian">Ovo-Vegetarian</option>
                     <option className="options" value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                     <option className="options" value="vegan">Vegan</option>
                     <option className="options" value="pescatarian">Pescatarian</option>
                     <option className="options" value="paleolithic">Paleo</option>
                     <option className="options" value="primal">Primal</option>
                     <option className="options" value="low fodmap">Low FODMAP</option>
                     <option className="options" value="whole 30">Whole30</option>
                     <option className="options" value="dairy free">Dairy Free</option>
          </select>     
          <button className="btn-reload" onClick={(e) => handleReset(e)}>
            Reload
          </button>
        </div>
      </aside>
    
  );
}