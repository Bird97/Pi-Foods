import { useDispatch } from "react-redux";

import {
  filterByContinent,
  orderByName,
  orderByPopulation,

  orderByScore,
  orderByName,
  filterByDiet,
  getDiets


} from "../../redux/actions";
import "./Filters.css";

export function Filter() {
  const dispatch = useDispatch();

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
          <select
            className="select"
            defaultValue="diets"
            onChange={(e) => handleFilterDiet(e)}
          >
            
            <option className="options" value="diets" disables>
              Diets
            </option>
            {getDiets.map(e=>{<option className="options" value={e.name}>{e.name}</option>})}
            
            <option className="options" value="Africa">
              Africa
            </option>
            <option className="options" value="South America">
              South America
            </option>
            <option className="options" value="North America">
              North America
            </option>
            <option className="options" value="Asia">
              Asia
            </option>
            <option className="options" value="Europe">
              Europe
            </option>
            <option className="options" value="Oceania">
              Oceania
            </option>
          </select>

          {
            //TODO filtro por Actividad
          }
          <button className="btn-reload" onClick={(e) => handleReset(e)}>
            Reload
          </button>
        </div>
      </aside>
    
  );
}