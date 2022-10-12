import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNameRecipe } from "../../redux/actions";
import "./SearchBar.css";

export function SearchBar() {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //Handle del input
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  //Handle del search
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name.toLowerCase()));
    setName("");
  }

  return (
    <div className="search-container">
      <button className="btn-search" onClick={(e) => handleSubmit(e)} type="submit">
        Search
      </button>
      <input
        value={name}
        className="input-search"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Recipe name"
      />
      
    </div>
  );
}